import React from "react";
import {NodeData} from './mainpage';
import Button from "@material-ui/core/Button";
import { CSSProperties } from "@material-ui/styles";
import ArrowRight from "@material-ui/icons/ArrowRight";
import NestedButton from "./nestedbutton";

interface IProps {
    listItems: NodeData[];
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

const buttonStyle = {
    width: "100%", 
    justifyContent: "flex-start", 
    color: "#5a5a5a",
    textTransform: "none",
    fontSize: "16px"
} as CSSProperties;

const activeButtonStyle = {
    backgroundColor: "#ec7ca2",
    color: "#fffdfd",
    boxShadow: "inset 0 0 1px 0px #717171"
}

class SideBar extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

    render() {

        const sidebar: JSX.Element = (
            <div className = "sidebar-container" style = {sidebarContainerStyle}>
                <div style = {listButtonContainerStyle}>
                    <Button style = {{width: "80%", justifyContent: "flex-start", color: "#5a5a5a", textTransform: "none", fontSize: "16px", ...activeButtonStyle}}>
                        Mathematics
                        <ArrowRight style = {{marginLeft: "auto"}} />
                    </Button>

                    <Button style = {{width: "80%", justifyContent: "flex-start", color: "#5a5a5a", textTransform: "none", fontSize: "16px"}}>
                        Mathematics
                    </Button>
                    <ButtonList nodes = {this.props.listItems} depth = {0}/>
                </div>
                
            </div>
        )

        return sidebar;
    }
}

function ButtonList(props: any) : JSX.Element {

    // depth: number, topLevelNodes: NodeData[]

    const topLevelNodes:NodeData[] = props.nodes;
    const depth:number = props.depth;
    /*
    title: "Mathematics",
    children: [
    {
        title: "Algebra",
        children: null
    }, 
    {
        title: "Calculus",
        children: null
    }, 
    {
        title: "Statistics",
        children: null
    }] 
    */ 
    const buttonList:JSX.Element = (
        <div style = {{marginRight: depth*-5, width: depth == 0 ? "80%": "100%"}}>
            {
                topLevelNodes.map(node => {
                    if(node.children != null) {
                        return (
                            <NestedButton title = {node.title} style = {buttonStyle}>
                                <ButtonList depth = {1} nodes = {node.children} />
                            </NestedButton>
                            );
                    } else {
                        return ( 
                            <Button style = {buttonStyle}>
                                {node.title}
                            </Button>
                        );
                    }
                })
            }
        </div>
    )
    
    return buttonList;
}

export default SideBar;