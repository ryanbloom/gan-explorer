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

        let buttonClass = this.props.machine.output[0] == undefined ? "icon-button disabled" : "icon-button"
        return (<div>
            <span className="panel-row">
                <Well latent={this.props.machine.inputs.a} onDrop={this.drop('a').bind(this)}/>
                →
                {outputs}
                <button className={buttonClass} onClick={this.rerun.bind(this)}>
                    <span className="material-icons-round">
                        replay
                    </span>
                </button>
            </span>
        </div>)
    }    
}
