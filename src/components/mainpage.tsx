import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "./sidebar";
import CourseContainer from "./coursecontainer";

interface IState {
    subjectData: NodeData[];
    dataDepth: number;
}

interface IProps {
    maxCols: number;
}

export interface NodeData {
    title: string;
    children: NodeData[] | null;
}

class MainPage extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            subjectData: [{
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
            }, {
                title: "Computer Science",
                children: [
                {
                    title: "Data Structures",
                    children: null
                }, 
                {
                    title: "Algorithms",
                    children: null
                }] 
            }],
            dataDepth: 0
        }
    }
    
    

    render() {
    
        const sidebar:any = (
            <SideBar listItems = {this.state.subjectData} />
            
        )

        const mainpage: any = (
            <React.Fragment>
                <Row>

                    <SideBar listItems = {this.state.subjectData} />
                    <Col>
                        <CourseContainer />
                    </Col>
                    
                </Row>
            </React.Fragment>
        )
        return mainpage;
    }
}

export default MainPage;