import React from "react"
import { DragContext } from "./context"
import Image from "./Image"
import Panel from "./Panel"

const dz = 512

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
            let thisOne = false
            if (this.state.draggedImage) {
                if (this.state.draggedImage.id == im.id) {
                    thisOne = true
                }
            }
            return <Image latent={im.latent} key={im.id} pos={im.pos}
                onMouseDown={this.mouseDownHandler(im).bind(this)}
                selected={this.state.selectedImage.id == im.id}
                mouseIsDown={thisOne}/>
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
                    cursorPos: {
                        x: e.clientX,
                        y: e.clientY
                    }
                })
            },
            finishDrag: () => {
                this.setState({
                    draggedImage: false
                })
            }
        }
        return (
            <DragContext.Provider value={val}>
                <div style={{width: "100%", height: "100%"}}
                    onMouseMove={this.handleMouseMove.bind(this)}
                    onMouseUp={this.handleMouseUp.bind(this)}>
                    <Panel />
                    {imgs}
                </div>
            </DragContext.Provider>
        )
    }
}
