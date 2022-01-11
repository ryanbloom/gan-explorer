import React from "react"
import {Well} from "./Wells"
import {updateMachine, interpolate} from "./operations"
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
        function update(name) {
            return function(z) {
                this.setState({
                    machine: updateMachine(this.state.machine, name, z)
                })
            }
        }
        
        return (<div>
            <span>
                A: <Well onDrop={update('a').bind(this)}/>
                B: <Well onDrop={update('b').bind(this)}/>
                Out: <Well readonly="true" latent={this.state.machine.output} />
            </span>
        </div>)
    }    
}
