import React from "react"
import { Well } from "./Well"
export default class InterpolatePanel extends React.Component {
    drop(name) {
        return function(z) {
            this.props.onDrop(name, z)
        }
    }

    render() {
        return (<div>
            <span>
                A: <Well latent={this.props.machine.inputs.a} onDrop={this.drop('a').bind(this)}/>
                B: <Well latent={this.props.machine.inputs.b} onDrop={this.drop('b').bind(this)}/>
                Out: <Well latent={this.props.machine.output} readonly />
            </span>
        </div>)
    }    
}
