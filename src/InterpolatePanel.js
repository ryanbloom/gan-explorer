import React from "react"
import { Well } from "./Well"
export default class InterpolatePanel extends React.Component {
    drop(name) {
        return function(z) {
            this.props.onDrop(name, z)
        }
    }

    render() {
        return (<div className="panel">
            <span className="panel-row">
                <Well latent={this.props.machine.inputs.a} onDrop={this.drop('a').bind(this)}/>
                →
                <Well latent={this.props.machine.output} readonly />
                ←
                <Well latent={this.props.machine.inputs.b} onDrop={this.drop('b').bind(this)}/>
            </span>
        </div>)
    }    
}
