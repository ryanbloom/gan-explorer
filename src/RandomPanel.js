import React from "react"
import { Well } from "./Well"
import { nRandom, randomLatent } from "./operations"

export default class RandomPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            output: new Array(nRandom).fill(undefined),
        }
    }

    generate() {
        let output = new Array(nRandom)
        for (let i = 0; i < nRandom; i++) {
            output[i] = randomLatent()
        }
        this.setState({
            output: output
        })
    }

    render() {
        const outputs = this.state.output.map(
            (x, idx) => <Well key={idx} latent={x} readonly />)
        return (<div>
            <button onClick={this.generate.bind(this)}>Generate</button>
            <span>{outputs}</span>
        </div>)
    }    
}
