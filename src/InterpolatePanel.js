import React from "react"
import {Well} from "./Wells"
import {update, interpolate} from "./operations"
export default class InterpolatePanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            machine: {
                inputs: {
                    a: undefined,
                    b: undefined
                },
                operation: interpolate,
                output: undefined,
            }
        }
    }
    render() {
        return (<div>
            <span>
                A: <Well latent={this.state.machine.inputs.a} onDrop={update('a').bind(this)}/>
                B: <Well latent={this.state.machine.inputs.b} onDrop={update('b').bind(this)}/>
                Out: <Well latent={this.state.machine.output} readonly />
            </span>
        </div>)
    }    
}
