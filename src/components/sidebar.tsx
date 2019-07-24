import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SubjectSideBar from "./subjectsidebar";
import Button from "react-bootstrap/Button";
import {NodeData} from "./mainpage";
import SidePillar from "./sidepillar";
import { thisTypeAnnotation } from "@babel/types";
import { randomBytes } from "crypto";

const colStyling = {
    padding: 0
}

const sideBarStyling = {
    height: "100%",
    width: "50px",
    borderRight: "1px solid #efefef",
    backgroundColor: "#f9f9f9"
}

interface IState {
    selectedNavs: number[];
}

interface IProps {
    depth: number;
    data: NodeData[];
}

class SideBar extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            selectedNavs: new Array(this.props.depth).fill(0)
        }
    }

    getTitles = (arr: NodeData[]) => 
    {
        let titles: string[] = [];

        arr.forEach(d => {
            titles.push(d.title);
        })

        return titles;
    }

    render() {
        let sidebar: any[] = [];
        let idepth: number = 0;
        let titles: string[];
        let currentList: NodeData[] = this.props.data; // List of node data objects on current level
        let currentLevel: NodeData | null = this.props.data[this.state.selectedNavs[idepth]]; // Focused node data object on ith level

        while(currentLevel != null) {
            titles = this.getTitles(currentList);

            sidebar.push(
                <Col md = {12/this.props.depth - 1} style = {{padding: "0px"}}>
                    <SidePillar titles = {titles} />
                </Col>
            );
            
            if(currentLevel.nested != null) {
                currentList = currentLevel.nested;
                currentLevel = currentList[this.state.selectedNavs[++idepth]]; // increase depth by 1, and get ith element in list
                
            } else {
                currentLevel = null;
            }
        };

        return (<Row style = {{height: "100%"}}> {sidebar} </Row>);
    }
}

export default SideBar;