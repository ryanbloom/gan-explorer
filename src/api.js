const host = ""

const enc_digits = 3
const max_enc = 1000 - 1
const enc_mult = 100

function clip(x, lo, hi) {
    return Math.max(lo, Math.min(x, hi))
}

function encodeLatent(z) {
    return z.map(
          x => String(Math.round(clip((x + 2) * enc_mult, 0, max_enc))).padStart(enc_digits, '0')
    ).join('')
}

function latentURL(z) {
    return `${host}/generate?latent=${encodeLatent(z)}`
}

export { latentURL }
