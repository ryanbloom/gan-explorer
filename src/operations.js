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
    console.log(d)
    return d
}