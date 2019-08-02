import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {NodeData} from "./mainpage";
import SidePillar from "./sidepillar";
import Button from "react-bootstrap/Button";

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
    depthToRender: number;
    selectedNavs: number[];
}

interface IProps {
    depth: number;
    data: NodeData[];
    onDepthChange: (depth: number) => void;
}

class SideBar extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            selectedNavs: new Array(this.props.depth).fill(0),
            depthToRender: 0
        }
        
    }

    selectNav = (navIndexSelected: number, depth: number) => {

        let nextState: number[] = this.state.selectedNavs;

        nextState[depth] = navIndexSelected;

        nextState.fill(0, depth+1);

        this.setState({
            selectedNavs: nextState
        })

        if(depth == this.state.depthToRender && depth != this.props.depth - 1) {
            this.setState((prevState) => (
                {
                    depthToRender: prevState.depthToRender + 1
                }
            ));

            this.props.onDepthChange(depth + 1)
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

    collapsePillars = (depthToCollapseFrom: number) => {
        this.setState({
            depthToRender: depthToCollapseFrom-1
        })

        this.props.onDepthChange(depthToCollapseFrom - 1);
    }

    render() {
        let sidebar: any[] = [];
        let idepth: number = 0;
        let titles: string[];
        let currentList: NodeData[] = this.props.data; // List of node data objects on current level
        let currentLevel: NodeData | null = this.props.data[this.state.selectedNavs[idepth]]; // Focused node data object on ith level

        if(this.state.depthToRender == -1) {
            sidebar.push(
                <Col>
                    <div style = {{width: "50px", height: "100%", backgroundColor: "#f9f9f9"}} >
                        <Button  style = {{width: "100%"}} onClick = {() => this.collapsePillars(this.props.depth)}>  >> </Button>
                    </div>
                </Col>
            )
            
        } else {
            while(currentLevel != null && idepth <= this.state.depthToRender) {
                titles = this.getTitles(currentList);

                
                
                sidebar.push(
                
                    <Col md = {12/(this.state.depthToRender + 1)} style = {{padding: "0px"}}>
                        <SidePillar depth = {idepth} titles = {titles} collapsePillar = {this.collapsePillars} selectNav = {this.selectNav}/>
                    </Col>
                );
                
                if(currentLevel.nested != null) {
                    currentList = currentLevel.nested;
                    currentLevel = currentList[this.state.selectedNavs[++idepth]]; // increase depth by 1, and get ith element in list
                    
                } else {
                    currentLevel = null;
                }
            };
        }

        return (<Row style = {{height: "100%"}}> {sidebar} </Row>);
    }
}

export default SideBar;