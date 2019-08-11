import React from "react";
import {NodeData} from './mainpage';
import Button from "@material-ui/core/Button";
import { CSSProperties } from "@material-ui/styles";
import ArrowRight from "@material-ui/icons/ArrowRight";
import NestedButton from "./nestedbutton";
import { NavLink, match } from "react-router-dom";
import { isExtraneousPopstateEvent } from "history/DOMUtils";
import ButtonList from "./buttonlist";

interface IProps {
    listItems: NodeData[];
}


interface IState {
    
}


const sidebarContainerStyle = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    borderRight: "1px solid #ececec"
}

const listButtonContainerStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingTop: "20%",
    flexWrap: "wrap"
} as CSSProperties;


class SideBar extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
        };
    }


    render() {

        const sidebar: JSX.Element = (
            <div className = "sidebar-container" style = {sidebarContainerStyle}>
                <div style = {listButtonContainerStyle}>
                    <ButtonList nodes = {this.props.listItems} depth = {0} parents = "" />
                </div>
                
            </div>
        )

        return sidebar;
    }
}

export default SideBar;