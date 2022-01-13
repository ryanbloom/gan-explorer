import React from "react"
import { DragContext } from "./context"
import Image from "./Image"
import Panel from "./Panel"

const dz = 512

let topZIndex = 0
function nextZIndex() {
    topZIndex += 1
    return topZIndex
}

let id = -1
function imageForLatent(z) {
    id += 1
    return {
        latent: z,
        id: id,
        zIndex: nextZIndex(),
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
            selectedImage: false,
            draggedImage: false,
            cursorPos: {
                x: 0, y: 0
            },
            images: {}
        }
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    mouseDownHandler(im) {
        return function(e) {
            if (e.button == 2) {
                // Right clicks shouldn't initiate a drag
                return
            }
            im.zIndex = nextZIndex()
            this.setState({
                draggedImage: im,
                selectedImage: im,
                cursorPos: {
                    x: e.clientX,
                    y: e.clientY
                }
            })
            return false
        }
    }

    handleMouseUp() {
        this.setState({
            draggedImage: false
        })
    }
    
    handleMouseMove(e) {
        // TODO: make this more efficient
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

    handleKeyDown(e) {
        if (e.key == "Backspace") {
            let images = this.state.images
            delete images[this.state.selectedImage.id]
            this.setState({
                images: images,
                selectedImage: false
            })
        }
    }

    render() {
        const imgs = Object.values(this.state.images).map(im => {
            return <Image latent={im.latent} key={im.id} pos={im.pos} zIndex={im.zIndex}
                onMouseDown={this.mouseDownHandler(im).bind(this)}
                selected={this.state.selectedImage.id == im.id}
                mouseIsDown={this.state.draggedImage.id == im.id}/>
        })

        const val = {
            draggedImage: this.state.draggedImage,
            startDrag: (e, latent) => {
                const rect = e.target.getBoundingClientRect()
                const pos = {
                    x: rect.left,
                    y: rect.top
                }

                let images = this.state.images
                let newImage = imageForLatent(latent)
                newImage.pos = pos
                images[newImage.id] = newImage
                this.setState({
                    images: images,
                    draggedImage: newImage,
                    selectedImage: newImage,
                    cursorPos: {
                        x: e.clientX,
                        y: e.clientY
                    }
                })
            },
            finishDrag: () => {
                let images = this.state.images
                delete images[this.state.draggedImage.id]
                this.setState({
                    draggedImage: false,
                    images: images
                })
            }
        }
        let cn = "canvas"
        if (this.state.draggedImage) {
            cn += " dragging"
        }
        return (
            <DragContext.Provider value={val}>
                <div className={cn}
                    onMouseMove={this.handleMouseMove.bind(this)}
                    onMouseUp={this.handleMouseUp.bind(this)}>
                    <Panel />
                    {imgs}
                </div>
            </DragContext.Provider>
        )
    }
}
