import React from "react";
import InterpolatePanel from "./InterpolatePanel";
import AnalogyPanel from "./AnalogyPanel";
import VariantsPanel from "./VariantsPanel";
import RandomPanel from "./RandomPanel";
import { nVariants, updateMachine, interpolate, analogy, variants, random } from "./operations"

export default class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activePanel: "Random",
            Interpolate: {
                inputs: {
                    a: undefined,
                    b: undefined
                },
                operation: interpolate,
                output: undefined,
            },
            Analogy: {
                inputs: {
                    a: undefined,
                    b: undefined,
                    c: undefined
                },
                operation: analogy,
                output: undefined,
            },
            Variants: {
                inputs: {
                    a: undefined
                },
                operation: variants,
                output: new Array(nVariants).fill(undefined),
            },
            Random: {
                inputs: {},
                operation: random,
                output: random(),
            }
        }
    }

    dropHandler(panelName) {
        return function(inputName, latent) {
            let update = {}
            update[panelName] = updateMachine(this.state[panelName], inputName, latent)
            this.setState(update)
        }
    }
    
    render() {
        const panelNames = ["Random", "Variants", "Interpolate", "Analogy"]
        function select(n, that) {
            that.setState({
                activePanel: n
            })
        }
        const tabs = panelNames.map(name => {
            if (name == this.state.activePanel) {
                return <div className="tab active" key={name} onClick={(_ => select("", this)).bind(this)}><span>{name}</span></div>
            } else {
                return <div className="tab inactive" key={name}><a href="#" onClick={(_ => select(name, this)).bind(this)}>{name}</a></div>
            }
        })

        let activeComponent = <div></div>
        if (this.state.activePanel == "Interpolate") {
            activeComponent = <InterpolatePanel machine={this.state.Interpolate} onDrop={this.dropHandler("Interpolate").bind(this)} />
        } else if (this.state.activePanel == "Analogy") {
            activeComponent = <AnalogyPanel machine={this.state.Analogy} onDrop={this.dropHandler("Analogy").bind(this)} />
        } else if (this.state.activePanel == "Variants") {
            activeComponent = <VariantsPanel machine={this.state.Variants} onDrop={this.dropHandler("Variants").bind(this)} />
        } else if (this.state.activePanel == "Random") {
            activeComponent = <RandomPanel machine={this.state.Random} onDrop={this.dropHandler("Random").bind(this)}/>
        }

        return (
            <div>
                <div id="tabs">{tabs}</div>
                {activeComponent}
            </div>
        )
    }
}
