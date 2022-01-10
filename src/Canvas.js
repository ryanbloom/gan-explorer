import React from "react"
import Image from "./Image"

const someLatent = new Array(512).fill(0)

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
            images: [imageForLatent(someLatent)]
        }
    }

    render() {

        function mouseMoveHandler(im) {
            return function(dx, dy) {
                let images2 = this.state.images
                // TODO: make this more efficient
                images2[im.id].pos = {
                    x: im.pos.x + dx,
                    y: im.pos.y + dy
                }
                this.setState({
                    images: images2
                })
            }
        }

        const imgs = this.state.images.map(im =>
            <Image latent={im.latent} key={im.id} pos={im.pos}
                onMouseMove={mouseMoveHandler(im).bind(this)} />
        )
        return (
            <div>
                {imgs}
            </div>
        )
    }
}