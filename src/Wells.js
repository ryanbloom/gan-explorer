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

    render() {
        function handleMouseDown(e) {
            if (this.props.latent) {
                this.context.startDrag(e, this.props.latent)
            }
        }
        function handleMouseOver() {
            if (!this.context.draggedImage) {
                return
            }
            this.setState({
                hover: true
            })
        }
        function handleMouseOut() {
            this.setState({
                hover: false
            })
        }
        function handleMouseUp() {
            if (!this.context.draggedImage || this.props.readonly) {
                return
            }
            let latent = this.context.draggedImage.latent
            if (this.props.onDrop) {
                this.props.onDrop(latent)
            }
            this.context.finishDrag()
        }
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
                onMouseDown={handleMouseDown.bind(this)}
                onMouseUp={handleMouseUp.bind(this)}
                onMouseOver={handleMouseOver.bind(this)}
                onMouseOut={handleMouseOut.bind(this)}>
                    {inside}
                </div>
        )
    }
}
Well.contextType = DragContext

export {Well}
