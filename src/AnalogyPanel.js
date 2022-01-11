import React from "react"
import { Well } from "./Well"
import { update, analogy } from "./operations"
export default class AnalogyPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    drop(name) {
        return function(z) {
            this.props.onDrop(name, z)
        }
    }
    
    render() {
        return (<div>
            <span className="panel-row">
                <Well latent={this.props.machine.inputs.a} onDrop={this.drop('a').bind(this)} />
                :
                <Well latent={this.props.machine.inputs.b} onDrop={this.drop('b').bind(this)} />
                ::
                <Well latent={this.props.machine.inputs.c} onDrop={this.drop('c').bind(this)} />
                :
                <Well latent={this.props.machine.output} readonly />
            </span>
        </div>)
    }    
}
