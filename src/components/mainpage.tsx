import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "./sidebar";
import CourseContainer from "./coursecontainer";

class MainPage extends React.Component {
    render() {
        
        const sidebar:any = (
            <Row>
                <Col md = {4}>
                <SideBar />
                </Col>
                <Col md = {8}>
                <CourseContainer />
                </Col>
            </Row>
        )

        return sidebar;
    }
}

export default MainPage;