import os
import sys
import io
import pickle
import torch
import functools

from PIL import Image

from starlette.applications import Starlette
from starlette.responses import Response, FileResponse
from starlette.exceptions import HTTPException
from starlette.staticfiles import StaticFiles
from starlette.routing import Mount, Route
import uvicorn

# Models

dz = 512
sys.path.append("stylegan2")
filenames = os.listdir("models")
models = {}

print("Loading models...")
for fname in filenames:
    model_name, ext = os.path.splitext(fname)
    if ext not in [".pt", ".pkl"]:
        continue
    with open("models/" + fname, "rb") as f:
        G = pickle.load(f)["G_ema"]
        G.forward = functools.partial(G.forward, force_fp32=True)
        models[model_name] = G
        param_count = sum([p.numel() for p in G.parameters()])
        print(f"Loaded {model_name} ({param_count} parameters)")

default_model = list(models.keys())[0]

def generate(model_name, latent):
    if model_name not in models:
        raise HTTPException(400, detail=f"Model \"{model_name}\" not found")
    g = models[model_name]
    img = g(latent, None)
    img = (img.permute(0, 2, 3, 1) * 127.5 + 128).clamp(0, 255).to(torch.uint8)
    return img[0].cpu().numpy()

# Decoding latent vectors

enc_digits = 3
max_enc = int(10**enc_digits) - 1
enc_mult = int(10**(enc_digits-1))

def decode_latent(z):
    return (torch.Tensor(
        [int(z[i:(i+enc_digits)]) for i in range(0, len(z), enc_digits)]
    ).reshape((1, -1)) / enc_mult) - 2

# Routes

async def home_route(request):
    return FileResponse("dist/index.html")

async def generate_route(request):
    latent_vector = None
    model_name = None
    if "model" in request.query_params:
        model_name = request.query_params["model"]
    else:
        model_name = default_model
    if "latent" in request.query_params:
        try:
            latent_vector = decode_latent(request.query_params['latent'])
        except ValueError:
            pass
        if latent_vector is None:
            raise HTTPException(400, detail="Invalid latent vector")
    else:
        latent_vector = torch.randn(1, dz)
    output = io.BytesIO()
    Image.fromarray(generate(model_name, latent_vector)).save(output, format="PNG")
    return Response(output.getvalue(), media_type="image/png")

app = Starlette(routes=[
    Route("/", home_route),
    Route("/generate", generate_route),
    Mount("/", app=StaticFiles(directory="dist"), name="dist")
])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=os.getenv("PORT", 8000))
