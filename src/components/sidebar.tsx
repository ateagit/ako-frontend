import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SubjectSideBar from "./subjectsidebar";
import Button from "react-bootstrap/Button";


const colStyling = {
    padding: 0
}

interface IState {
    collapse: boolean;
}

interface IProps {}
class SideBar extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            collapse: false
        }
    }

    collapseSideBar = () => {
        this.setState(
            {
                collapse: !this.state.collapse
            }
        );
    }

    render() {
        let sidebar: any;

        if(this.state.collapse) {
            sidebar = (
                <div style = {{height: "100%", width: "50px", borderRight: "1px solid red"}}>
                    <Button style = {{float:"right"}} onClick = {this.collapseSideBar}> 
                            Open
                    </Button> 
                </div>
            )
        } else {
            sidebar = (
                <Row style = {{height: "100%"}}>
                    <Col md = {6} style= {{...colStyling, ...{zIndex: 2}}}>
                        <SubjectSideBar 
                            title="Subject" 
                            collapseSidebar = {this.collapseSideBar}
                            style = {{boxShadow: "#efefef 3px 0px 20px 0px"}}/>
                    </Col>
                    <Col md = {6} style= {colStyling}>
                        <SubjectSideBar
                            title="Course"
                            collapseSidebar = {this.collapseSideBar}/>
                    </Col>
                </Row>
            );
        }
        
        return sidebar;
    }
}

export default SideBar;