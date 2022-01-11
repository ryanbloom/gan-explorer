import React from "react"
import {Well} from "./Wells"
import {update, analogy} from "./operations"
export default class AnalogyPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            machine: {
                inputs: {
                    a: undefined,
                    b: undefined,
                    c: undefined
                },
                operation: analogy,
                output: undefined,
            }
        }
    }
    render() {
        return (<div>
            <span>
                <Well latent={this.state.machine.inputs.a} onDrop={update('a').bind(this)}/>
                :
                <Well latent={this.state.machine.inputs.b} onDrop={update('b').bind(this)}/>
                ::
                <Well latent={this.state.machine.inputs.c} onDrop={update('c').bind(this)}/>
                :
                <Well latent={this.state.machine.output} readonly />
            </span>
        </div>)
    }    
}
