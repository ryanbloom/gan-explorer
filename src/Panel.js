import React from "react";
import InterpolatePanel from "./InterpolatePanel";
import AnalogyPanel from "./AnalogyPanel";
import VariantsPanel from "./VariantsPanel";

export default class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activePanel: "Interpolate"
        }
    }

    render() {
        const panelNames = ["Interpolate", "Analogy", "Variants"]
        function select(n, that) {
            that.setState({
                activePanel: n
            })
        }
        const tabs = panelNames.map(name => {
            if (name == this.state.activePanel) {
                return <span className="tab" key={name}><span>{name}</span></span>
            } else {
                return <span className="tab" key={name}><a href="#" onClick={(_ => select(name, this)).bind(this)}>{name}</a></span>
            }
        })

        let activeComponent = <div>Nothing active</div>
        if (this.state.activePanel == "Interpolate") {
            activeComponent = <InterpolatePanel />
        } else if (this.state.activePanel == "Analogy") {
            activeComponent = <AnalogyPanel />
        } else if (this.state.activePanel == "Variants") {
            activeComponent = <VariantsPanel />
        }

        return (
            <div>
                <div id="tabs">{tabs}</div>
                {activeComponent}
            </div>
        )
    }
}
