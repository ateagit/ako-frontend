import React from "react";
import {NodeData} from './mainpage';
import Button from "@material-ui/core/Button";
import { CSSProperties } from "@material-ui/styles";
import ArrowRight from "@material-ui/icons/ArrowRight";
import NestedButton from "./nestedbutton";
import { NavLink, match } from "react-router-dom";
import { isExtraneousPopstateEvent } from "history/DOMUtils";
import ButtonList from "./buttonlist";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
interface IProps {
    listItems: NodeData[];
}


interface IState {
    open: boolean;
}


const sidebarContainerStyle = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    borderRight: "1px solid #ececec",
    position: "fixed",
    zIndex: 4,
    paddingTop: "50px",
    top: 0
} as CSSProperties;

const listButtonContainerStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flexWrap: "wrap"
} as CSSProperties;

const smallerStyle = {
    width: "50px",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    borderRight: "1px solid #ececec",
    zIndex: 4,
    top: 0,
    textAlign: "end"
}as CSSProperties;

class SideBar extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            open: false
        };
    }

    public toggleOpen = () => {
        this.setState((prevState: any) => {
            return {open: !prevState.open}
        })
    }

    render() {

        const sidebar: JSX.Element = (
            
                this.state.open ? (<div className = "sidebar-container" style = {sidebarContainerStyle}>
                <div style = {listButtonContainerStyle}>
                    <IconButton onClick = {this.toggleOpen} aria-label="delete">
                        <ArrowBackIcon />
                    </IconButton>.
                    <ButtonList nodes = {this.props.listItems} depth = {0} parents = "" />
                </div>
                
            </div>) : 
            <div style = {smallerStyle}>
            <IconButton onClick = {this.toggleOpen} aria-label="delete">
                <ArrowForwardIcon style ={{padding: 0}}/>
            </IconButton>
            </div>
                    
        )
        return sidebar;
    }
}

export default SideBar;