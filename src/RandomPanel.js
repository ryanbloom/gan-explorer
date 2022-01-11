import React from "react"
import { Well } from "./Well"

export default class RandomPanel extends React.Component {
    rerun() {
        this.props.onDrop()
    }

    render() {
        const outputs = this.props.machine.output.map(
            (x, idx) => <Well key={idx} latent={x} readonly />)

        return (<div className="panel-row">
            {outputs}
            <button className="icon-button" onClick={this.rerun.bind(this)}>
                <span className="material-icons-round">replay</span>
            </button>
        </div>)
    }    
}
