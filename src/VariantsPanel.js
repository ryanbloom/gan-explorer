import React from "react"
import { Well } from "./Well"

export default class VariantsPanel extends React.Component {
    drop(name) {
        return function(z) {
            this.props.onDrop(name, z)
        }
    }

    rerun() {
        this.props.onDrop()
    }

    render() {
        const outputs = this.props.machine.output.map(
            (x, idx) => <Well key={idx} latent={x} readonly />)
        return (<div>
            <span>
                <Well latent={this.props.machine.inputs.a} onDrop={this.drop('a').bind(this)}/>
                <button onClick={this.rerun.bind(this)}>Generate</button>
                →
                <span>{outputs}</span>
            </span>
        </div>)
    }    
}
