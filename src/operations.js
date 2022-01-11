// UI settings
export let nVariants = 3
export let nRandom = 3
let variantDistance = 10.0

let dz = 512

export function updateMachine(m, key, val) {
    if (key) {
        m.inputs[key] = val
    }
    for (let key in m.inputs) {
        if (!m.inputs[key]) {
            return m
        }
    }
    m.output = m.operation(m)
    return m
}

// Adapted from https://stackoverflow.com/a/36481059
function gaussian() {
    let u = 0, v = 0
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
}

export function randomLatent() {
    let arr = new Array(dz)
    for (let i = 0; i < dz; i++) {
        arr[i] = gaussian()
    }
    return arr
}

export function random(m) {
    let output = new Array(nRandom)
    for (let i = 0; i < nRandom; i++) {
        output[i] = randomLatent()
    }
    return output
}

const zeroLatent = new Array(dz).fill(0)

export function interpolate(m) {
    const args = m.inputs
    if (args.a.length != args.b.length) {
        console.log("Length mismatch")
    }
    let c = new Array(args.a.length)
    for (let i = 0; i < args.a.length; i++) {
        c[i] = 0.5*args.a[i] + 0.5*args.b[i]
    }
    return c
}

export function analogy(m) {
    const args = m.inputs
    if (args.a.length != args.b.length || args.b.length != args.c.length) {
        console.log("Length mismatch")
    }
    let d = new Array(args.a.length)
    for (let i = 0; i < args.a.length; i++) {
        d[i] = args.c[i] + (args.b[i] - args.a[i])
    }
    return d
}

export function variants(m) {
    const a = m.inputs.a
    let outputs = []
    for (let i = 0; i < nVariants; i++) {
        let delta = new Array(a.length)
        let norm = 0
        for (let j = 0; j < a.length; j++) {
            let rand = Math.random() - 0.5
            delta[j] = rand
            norm += rand*rand
        }
        norm = Math.sqrt(norm)
        let v = new Array(a.length)
        for (let j = 0; j < a.length; j++) {
            v[j] = a[j] + (delta[j]/norm*variantDistance)
        }
        outputs.push(v)
    }
    return outputs
}
