import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SubjectSideBar from "./subjectsidebar";
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
    sidebars: SidebarState[];
    numCollapsed: number;
}

interface IProps {
    collapseSidebar: (numCollapsed: number) => void;
}

interface SidebarState {
    name: string; 
    collapsed: boolean;
}

class SideBar extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            sidebars: [
                {
                    name: "Subject",
                    collapsed: false
                },
                {
                    name: "Course",
                    collapsed: false
                }
            ],
            numCollapsed: 0
        }
    }

    collapseSideBar = (title: string) => {
        let numToCollapse: number;
        let sidebarsToCollapse: SidebarState[] = this.state.sidebars;

        if(title == this.state.sidebars[0].name) {
            numToCollapse = 2;
        } else {
            numToCollapse = 1;
        }

        sidebarsToCollapse.forEach(t => {
            if(t.name === title) {
                t.collapsed = !t.collapsed;
            }
        })

        this.setState({
            numCollapsed: numToCollapse,
            sidebars: sidebarsToCollapse
        });
        
        this.props.collapseSidebar(numToCollapse);
    }

    render() {
        let sidebar: any;
        
        sidebar = (
            <Row style = {{height: "100%"}}>
                {
                <Col md = {1} style = {sideBarStyling}>
                    <Button style = {{float:"right"}} onClick = {() => this.collapseSideBar(this.state.sidebars[0].name)}> 
                            {">>"}
                    </Button> 
                </Col>}

                <Col md = {this.state.numCollapsed == 1 ? 12: 6} style= {{...colStyling, ...{zIndex: 2}}}>
                    <SubjectSideBar 
                        title={this.state.sidebars[0].name}
                        collapseSidebar = {() => this.collapseSideBar(this.state.sidebars[0].name)}
                        style = {{boxShadow: "#efefef 3px 0px 20px 0px"}}/>
                </Col>
                {this.state.numCollapsed > 0 ? null :
                    
                <Col md = {5} style= {colStyling}>
                    <SubjectSideBar
                        title={this.state.sidebars[1].name}
                        collapseSidebar = {() => this.collapseSideBar(this.state.sidebars[1].name)}/>
                </Col>
                }
                
            </Row>
        );
        
        
        return sidebar;
    }
}

export default SideBar;