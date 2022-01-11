function updateMachine(m, key, val) {
    m.inputs[key] = val
    for (let key in m.inputs) {
        if (!m.inputs[key]) {
            return m
        }
    }
    m.output = m.operation(m)
    return m
}

export function update(name) {
    return function(z) {
        this.setState({
            machine: updateMachine(this.state.machine, name, z)
        })
    }
}

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

export let nVariants = 3
let variantDistance = 10.0
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
