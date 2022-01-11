import React from "react"
import {latentURL} from "./api"

export default class Image extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const st = {
            position: "absolute",
            pointerEvents: this.props.mouseIsDown ? "none" : "auto",
            left: this.props.pos.x + "px",
            top: this.props.pos.y + "px"
        }
        return (
            <img src={latentURL(this.props.latent)} style={st}
                onMouseDown={this.props.onMouseDown}
                draggable="false"
                />
        )
    }
}
