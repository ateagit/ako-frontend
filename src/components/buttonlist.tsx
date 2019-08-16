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
    boxShadow: "#ca7393 0px 0px 0px 1px inset"
}

class ButtonList extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

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
                                <NestedButton key = {node.name} title = {node.name} parents = {parents}>
                                    <ButtonList  key = {node.name + "list"} depth = {1} nodes = {node.children} parents = {parents + `/${node.name}`} />
                                </NestedButton>
                                );
                        } else {
                            const link:string = `/courses${parents}/${node.name}`.replace(/ /g,"-").toLowerCase();
    
                            return ( 
                                <NavLink key = {node.name + "link"} to = {link} style = {{textDecoration: "none"}}>
                                    <Route render={(match: any) => {
                                        return (
                                        <Button style = {Object.assign({}, buttonStyle, (match.location.pathname === link ? activeButtonStyle : {}))}>
                                            {node.name}
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