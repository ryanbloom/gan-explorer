import React from "react"
import {Well} from "./Wells"
import {update, variants, nVariants} from "./operations"

export default class VariantsPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            machine: {
                inputs: {
                    a: undefined
                },
                operation: variants,
                output: new Array(nVariants).fill(undefined),
            }
        }
    }
    render() {
        const outputs = this.state.machine.output.map(
            (x, idx) => <Well key={idx} latent={x} readonly />)
        return (<div>
            <span>
                <Well latent={this.state.machine.inputs.a} onDrop={update('a').bind(this)}/>
                →
                <span>{outputs}</span>
            </span>
        </div>)
    }    
}
