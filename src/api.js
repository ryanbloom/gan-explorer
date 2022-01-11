const enc_digits = 3
const max_enc = 1000 - 1
const enc_mult = 100


/*def encode_latent(z):
    adjusted = (z + 2) * enc_mult
    clipped = np.clip(adjusted, 0, max_enc)
    return ''.join([f"{round(x):03}" for x in clipped])
*/

function clip(x, lo, hi) {
    return Math.max(lo, Math.min(x, hi))
}

function encodeLatent(z) {
    return z.map(
          x => String(Math.round(clip((x + 2) * enc_mult, 0, max_enc))).padStart(enc_digits, '0')
    ).join('')
}

function latentURL(z) {
    return `http://localhost:8000/?latent=${encodeLatent(z)}`
}

export {latentURL}