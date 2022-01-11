import React from "react"
import { Well } from "./Well"

export default class RandomPanel extends React.Component {
    rerun() {
        this.props.onDrop()
    }

    render() {
        const outputs = this.props.machine.output.map(
            (x, idx) => <Well key={idx} latent={x} readonly />)
        return (<div>
            <button onClick={this.rerun.bind(this)}>Generate</button>
            <span>{outputs}</span>
        </div>)
    }    
}
