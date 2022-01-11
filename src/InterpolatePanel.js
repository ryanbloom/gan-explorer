import React from "react"
import {InputWell, OutputWell} from "./Wells"

export default class InterpolatePanel extends React.Component {
    render() {
        return (<div>
            <span>
                1: <InputWell />
                2: <InputWell />
                Out: <OutputWell latent="" />
            </span>
        </div>)
    }    
}
