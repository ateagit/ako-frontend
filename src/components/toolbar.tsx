import React from "react";

const toolbarStyling = {
    minHeight: "50px",
    width: "100%",
    backgroundColor: "#f7f7f7"
}

interface IProps {
    children: any;
}

class ToolBar extends React.Component<IProps, {}> {
    render() {
        return (
            <div style = {toolbarStyling}>
                {this.props.children}
            </div>
        )
    }
}

export default ToolBar;