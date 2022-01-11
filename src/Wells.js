import React from "react"
import { DragContext } from "./context"
import {latentURL} from "./api"

const wellStyle = {
    width: "100px",
    height: "100px",
    backgroundColor: "#aaa",
    display: "inline-block"
}

class InputWell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latent: false
        }
    }

    render() {
        function handleMouseUp() {
            if (!this.context.draggedImage) {
                return
            }
            let latent = this.context.draggedImage.latent
            this.setState({
                latent: latent
            })
            this.context.finishDrag()
        }
        let inside
        if (this.state.latent) {
            inside = <img src={latentURL(this.state.latent)} />
        } else {
            inside = <div></div>
        }
        return (
            <div style={wellStyle} onMouseUp={handleMouseUp.bind(this)}>{inside}</div>
        )
    }
}
InputWell.contextType = DragContext

class OutputWell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latent: false
        }
    }
    render() {
        let inside
        if (this.state.latent) {
            inside = <img src={latentURL(this.state.latent)} />
        } else {
            inside = <div></div>
        }
        return (
            <div style={wellStyle}>{inside}</div>
        )
    }
}

export {InputWell, OutputWell}
