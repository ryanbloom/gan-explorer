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
                A: <Well onDrop={update('a').bind(this)}/>
                B: <Well onDrop={update('b').bind(this)}/>
                Out: <Well readonly latent={this.state.machine.output} />
            </span>
        </div>)
    }    
}
