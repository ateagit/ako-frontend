import React from "react";

const toolbarStyling = {
    width: "100%",
    backgroundColor: "#f7f7f7",
    marginTop: "40px",
    borderRadius: "5px"
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