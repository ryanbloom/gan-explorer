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
        if (e.button == 2) {
            // Right clicks shouldn't initiate a drag
            return
        }
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
        if (this.props.onDrop) {
            this.props.onDrop(this.context.draggedImage.latent)
        }
        this.context.finishDrag()
    }

    render() {
        let inside
        let latent = this.props.latent
        if (latent) {
            inside = <img src={latentURL(latent)} draggable="false" onDragStart={e => {e.preventDefault()}} />
        } else if (!this.props.readonly) {
            inside = <div className="well-placeholder"></div>
        } else {
            inside = <div></div>
        }
        let cn = "well"
        if (this.state.hover && !this.props.readonly) {
            cn += " highlighted"
        }
        if (this.props.latent) {
            cn += " full"
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
