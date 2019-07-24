import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "./sidebar";
import CourseContainer from "./coursecontainer";

interface IState {
    subjectData: NodeData[];
}

interface IProps {
}

export interface NodeData {
    title: string;
    nested: NodeData[] | null;
}

class MainPage extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            subjectData: [{
                title: "Mathematics",
                nested: [
                {
                    title: "Algebra",
                    nested: null
                }, 
                {
                    title: "Calculus",
                    nested: null
                }] 
            }]
        }
    }

    render() {

        const sidebar:any = (
            <Row>
                <Col md = {4}>
                    <SideBar depth = {2} data = {this.state.subjectData} />
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