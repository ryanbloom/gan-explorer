import React from "react"
import { Replay } from "@mui/icons-material"
import { IconButton } from "@mui/material"
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
            <IconButton onClick={this.rerun.bind(this)}>
                <Replay />
            </IconButton>
        </div>)
    }    
}
