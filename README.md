# GAN Explorer

This is a simple drag-and-drop web interface for generating images with GANs (generative adversarial networks). It supports:

* Generating images from random latent vectors
* Generating variants of an image by moving the latent vector in a random direction
* Interpolating between two images by averaging their latent vectors
* Completing "image analogies" like A:B::C:D (the latent vector of D is calculated as `C+B-A`)

A live demo is available [here](https://gan-explorer.ryan-bloom.com), using the FFHQ 256x256 model from NVIDIA ([download site](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/research/models/stylegan2/files)). You may have to wait a few moments for the container to start up.

## Development

The backend is designed to be compatible with [stylegan2-ada-pytorch](https://github.com/NVlabs/stylegan2-ada-pytorch). It should be adaptable to similar architectures by modifying `server.py`.

You'll need [Node.js](https://nodejs.org/en/) to build the frontend.

```bash
git clone https://github.com/ryanbloom/gan-explorer.git
cd gan-explorer
# Unpickling models relies on having source code available
git clone https://github.com/NVlabs/stylegan2-ada-pytorch
# Download a pretrained model from somewhere
wget $SOME_MODEL_URL -P models
# Bundle JavaScript and run the application
npm install
npx parcel build src/index.html
python server.py
```
