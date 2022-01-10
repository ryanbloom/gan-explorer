import React from "react"

const enc_digits = 3
const max_enc = 1000 - 1
const enc_mult = 100


/*def encode_latent(z):
    adjusted = (z + 2) * enc_mult
    clipped = np.clip(adjusted, 0, max_enc)
    return ''.join([f"{round(x):03}" for x in clipped])
*/

function clip(x, lo, hi) {
    return Math.max(lo, Math.min(x, hi))
}

function encodeLatent(z) {
    return z.map(
          x => String(Math.round(clip((x + 2) * enc_mult, 0, max_enc))).padStart(enc_digits, '0')
    ).join('')
}

function latentURL(z) {
    return `http://localhost:8000/?latent=${encodeLatent(z)}`
}

export default class Image extends React.Component {
    constructor(props) {
          super(props)
          this.state = {
              anchor: {
                  x: 0,
                  y: 0
              }
          }
    }
    render() {
        const st = {
            position: "absolute",
            left: this.props.pos.x + "px",
            top: this.props.pos.y + "px"
        }
        function handleMouseDown(e) {
            // const rect = e.target.getBoundingClientRect()
            this.setState({
                mouseDown: true,
                anchor: {
                    x: e.clientX,// - rect.left,
                    y: e.clientY// - rect.top
                }
            })
        }
        function handleMouseUp(e) {
            this.setState({
                mouseDown: false
            })
        }
        function handleMouseMove(e) {
            if (!this.state.mouseDown) {
                return
            }
            e.preventDefault()
            this.props.onMouseMove(
                e.clientX - this.state.anchor.x,
                e.clientY - this.state.anchor.y)
            this.setState({
                anchor: {
                    x: e.clientX,// - rect.left,
                    y: e.clientY// - rect.top
                }
            })
        }
        return (
            <img src={latentURL(this.props.latent)} style={st}
                onMouseDown={handleMouseDown.bind(this)}
                onMouseMove={handleMouseMove.bind(this)}
                onMouseUp={handleMouseUp.bind(this)}
                draggable="false"
                />
        )
    }
}