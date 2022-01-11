import React from "react"

export const DragContext = React.createContext({
    draggedImage: '',
    finishDrag: () => {},
    hideImage: () => {}
});
