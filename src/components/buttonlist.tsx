import { NodeData } from "./mainpage";
import { render } from "react-dom";
import React, { CSSProperties } from "react";
import NestedButton from "./nestedbutton";
import { NavLink, Route } from "react-router-dom";
import { Button } from "@material-ui/core";

interface IProps {
    nodes: NodeData[],
    depth: number,
    parents: string,
    
}

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


class ButtonList extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }
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
    

    render() {
        const topLevelNodes:NodeData[] = this.props.nodes;
        const depth:number = this.props.depth;
        const parents: string = this.props.parents;

        const buttonList:JSX.Element = (
            <div style = {{marginRight: depth*-5, width: depth == 0 ? "80%": "100%"}}>
                {
                    topLevelNodes.map(node => {
                        if(node.children != null) {
                            return (
                                <NestedButton key = {node.title} title = {node.title} parents = {parents}>
                                    <ButtonList  key = {node.title + "list"} depth = {1} nodes = {node.children} parents = {parents + `/${node.title}`} />
                                </NestedButton>
                                );
                        } else {
                            const link:string = `/courses${parents}/${node.title}`.replace(/ /g,"-").toLowerCase();
    
                            return ( 
                                <NavLink key = {node.title + "link"} to = {link} style = {{textDecoration: "none"}}>
                                    <Route render={(match: any) => {
                                        return (
                                        <Button style = {Object.assign({}, buttonStyle, (match.location.pathname === link ? activeButtonStyle : {}))}>
                                            {node.title}
                                        </Button>);
                                    }} />
                                </NavLink>
                            );
                        }
                    })
                }
            </div>
        )

        return buttonList;
    }
    
}

export default ButtonList;