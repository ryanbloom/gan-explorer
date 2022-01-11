import React from "react"
import { DragContext } from "./context"
import { latentURL } from "./api"

class Well extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }
    }

    handleMouseDown(e) {
        if (this.props.latent) {
            this.context.startDrag(e, this.props.latent)
        }
    }
    handleMouseOver() {
        if (!this.context.draggedImage) {
            return
        }
        this.setState({
            hover: true
        })
    }
    handleMouseOut() {
        this.setState({
            hover: false
        })
    }
    handleMouseUp() {
        if (!this.context.draggedImage || this.props.readonly) {
            return
        }
        let latent = this.context.draggedImage.latent
        if (this.props.onDrop) {
            this.props.onDrop(latent)
        }
        this.context.finishDrag()
    }

    render() {
        let inside
        let latent = this.props.latent
        if (latent) {
            inside = <img src={latentURL(latent)} draggable="false" />
        } else {
            inside = <div></div>
        }
        let cn = "well"
        if (this.state.hover && !this.props.readonly) {
            cn += " highlighted"
        }
        return (
            <div className={cn}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
                onMouseOver={this.handleMouseOver.bind(this)}
                onMouseOut={this.handleMouseOut.bind(this)}
                
                >
                    {inside}
                </div>
        )
    }
}
Well.contextType = DragContext

export { Well }
