import React from "react"
import { DragContext } from "./context"
import Image from "./Image"
import Panel from "./Panel"

const someLatent = new Array(512).fill(0)
const latent2 = new Array(512).fill(0.1)

let id = -1
function imageForLatent(z) {
    id += 1
    return {
        latent: z,
        id: id,
        pos: {
            x: 0,
            y: 0
        }
    }
}

export default class Canvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            draggedImage: false,
            cursorPos: {
                x: 0, y: 0
            },
            images: [
                imageForLatent(someLatent),
                imageForLatent(latent2)
            ]
        }
    }

    render() {

        function mouseDownHandler(im) {
            return function(e) {
                this.setState({
                    draggedImage: im,
                    cursorPos: {
                        x: e.clientX,
                        y: e.clientY
                    }
                })
                return false
            }
        }

        function handleMouseUp() {
            this.setState({
                draggedImage: false
            })
        }
        
        function handleMouseMove(e) {
            // TODO: make this more efficient
            // FIXME: not called if the cursor drags outside the image boundary
            let im = this.state.draggedImage
            if (!im) {
                return
            }
            let images2 = this.state.images
            const dx = e.clientX - this.state.cursorPos.x
            const dy = e.clientY - this.state.cursorPos.y
            images2[this.state.draggedImage.id].pos = {
                x: im.pos.x + dx,
                y: im.pos.y + dy
            }
            this.setState({
                images: images2,
                cursorPos: {
                    x: e.clientX,
                    y: e.clientY
                }
            })
        }

        const imgs = this.state.images.map(im => {
            let thisOne = false
            if (this.state.draggedImage) {
                if (this.state.draggedImage.id == im.id) {
                    thisOne = true
                }
            }
            return <Image latent={im.latent} key={im.id} pos={im.pos}
                onMouseDown={mouseDownHandler(im).bind(this)}
                mouseIsDown={thisOne}/>
        }
        )

        function handleWellHover() {

        }
        const val = {
            draggedImage: this.state.draggedImage,
            finishDrag: () => {
                this.setState({
                    draggedImage: false
                })
            }
        }
        return (
            <DragContext.Provider value={val}>
                <div style={{width: "100%", height: "100%"}}
                    onMouseMove={handleMouseMove.bind(this)}
                    onMouseUp={handleMouseUp.bind(this)}>
                    <Panel onHover={handleWellHover.bind(this)}/>
                    {imgs}
                </div>
            </DragContext.Provider>
        )
    }
}
