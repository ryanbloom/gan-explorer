import React from "react"
import { Replay } from '@mui/icons-material'
import { IconButton } from "@mui/material"
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
            <span className="panel-row">
                <Well latent={this.props.machine.inputs.a} onDrop={this.drop('a').bind(this)}/>
                →
                {outputs}
                <IconButton disabled={this.props.machine.output[0] == undefined} onClick={this.rerun.bind(this)}>
                    <Replay />
                </IconButton>
            </span>
        </div>)
    }    
}
