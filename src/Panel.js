import React from "react"
import { Tabs, Tab, IconButton, Menu, MenuItem, Stack, ListItemIcon, ListItemText } from "@mui/material"
import { MoreVert, Delete, ContentCopy, Info } from "@mui/icons-material"
import InterpolatePanel from "./InterpolatePanel"
import AnalogyPanel from "./AnalogyPanel"
import VariantsPanel from "./VariantsPanel"
import RandomPanel from "./RandomPanel"
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
        this.menuOpenHandler = this.menuOpenHandler.bind(this)
        this.menuCloseHandler = this.menuCloseHandler.bind(this)
        this.reset = this.reset.bind(this)
        this.copyLatent = this.copyLatent.bind(this)
    }

    dropHandler(panelName) {
        return function (inputName, latent) {
            let update = {}
            update[panelName] = updateMachine(this.state[panelName], inputName, latent)
            this.setState(update)
        }
    }

    tabHandler(event, tabName) {
        this.setState({
            activePanel: tabName
        })
    }

    menuOpenHandler(event) {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    menuCloseHandler(event) {
        this.setState({
            anchorEl: null
        })
    }

    reset(e) {
        this.menuCloseHandler(e)
        this.props.onReset(e)
    }

    copyLatent() {
        const text = String(this.props.selectedLatent)
        console.log("Copying latent vector to the clipboard: ", text)
        navigator.clipboard.writeText(text).catch(err => {
          console.error("Could not copy text: ", err)
        })
    }

    render() {
        let activeComponent = <div></div>
        if (this.state.activePanel == "Interpolate") {
            activeComponent = <InterpolatePanel machine={this.state.Interpolate} onDrop={this.dropHandler("Interpolate").bind(this)} />
        } else if (this.state.activePanel == "Analogy") {
            activeComponent = <AnalogyPanel machine={this.state.Analogy} onDrop={this.dropHandler("Analogy").bind(this)} />
        } else if (this.state.activePanel == "Variants") {
            activeComponent = <VariantsPanel machine={this.state.Variants} onDrop={this.dropHandler("Variants").bind(this)} />
        } else if (this.state.activePanel == "Random") {
            activeComponent = <RandomPanel machine={this.state.Random} onDrop={this.dropHandler("Random").bind(this)} />
        }

        const open = Boolean(this.state.anchorEl)

        return (
            <div>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Tabs value={this.state.activePanel} onChange={this.tabHandler.bind(this)}>
                        <Tab value="Random" label="Random" />
                        <Tab value="Variants" label="Variants" />
                        <Tab value="Interpolate" label="Interpolate" />
                        <Tab value="Analogy" label="Analogy" />
                    </Tabs>
                    <IconButton
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={this.menuOpenHandler}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={open}
                        onClose={this.menuCloseHandler}>
                        <MenuItem disabled={!this.props.selectedLatent} onClick={this.copyLatent}>
                            <ListItemIcon><ContentCopy /></ListItemIcon>
                            <ListItemText>Copy latent vector for selected image</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={this.reset}>
                            <ListItemIcon><Delete /></ListItemIcon>
                            <ListItemText>Clear</ListItemText>
                        </MenuItem>
                        <MenuItem component="a" target="_blank" href="https://github.com/ryanbloom/gan-explorer" onClick={this.menuCloseHandler}>
                            <ListItemIcon><Info /></ListItemIcon>
                            <ListItemText>About</ListItemText>
                        </MenuItem>
                    </Menu>
                </Stack>
                {activeComponent}
            </div>
        )
    }
}
