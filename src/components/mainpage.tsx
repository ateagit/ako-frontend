import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "./sidebar";
import CourseContainer from "./coursecontainer";

interface IState {
    numCollapsed: number
}

interface IProps {
}
class MainPage extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            numCollapsed: 0
        }
    }

    collapseSideBar = (numberCollapsed: number) => {
        this.setState(
            {
                numCollapsed: numberCollapsed
            }
        );
    }

    render() {
        let size: number = 9;

        switch(this.state.numCollapsed) {
            case 2:
                size = 12;
                break;
            case 1: 
                size = 10;
                break;

            case 0:
                size = 8;
                break;
        }

        const sidebar:any = (
            <Row>
                <Col md = {12 - size}>
                    <SideBar collapseSidebar = {this.collapseSideBar} />
                </Col>
                <Col md = {size}>
                    <CourseContainer />
                </Col>
            </Row>
        )

        return sidebar;
    }
}

export default MainPage;