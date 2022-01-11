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
                <Well onDrop={update('a').bind(this)}/>
                :
                <Well onDrop={update('b').bind(this)}/>
                ::
                <Well onDrop={update('c').bind(this)}/>
                :
                <Well readonly latent={this.state.machine.output} />
            </span>
        </div>)
    }    
}
