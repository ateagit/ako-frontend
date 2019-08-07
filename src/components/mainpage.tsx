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
                }, 
                {
                    title: "Statistics",
                    nested: null
                }] 
            }, {
                title: "Computer Science",
                nested: [
                {
                    title: "Data Structures",
                    nested: null
                }, 
                {
                    title: "Algorithms",
                    nested: null
                }] 
            }],
            dataDepth: 0
        }
    }
    
    changeDepth = (newDepth: number) => {
        this.setState({
            dataDepth: newDepth
        });
    }

    render() {
        
        let nCol = this.state.dataDepth < 2 ? 2 * this.state.dataDepth: this.props.maxCols;
        

        if(this.state.dataDepth === -1) {
            nCol = 1;
        } else if(this.state.dataDepth > 2) {
            nCol = this.props.maxCols;
        } else {
            nCol = 2 * (this.state.dataDepth + 1);
        }

        const sidebar:any = (
            <Row>
                <Col md = {2}>
                    <SideBar depth = {2} data = {this.state.subjectData} onDepthChange = {this.changeDepth} />
                </Col>
                <Col md = {10}>
                    <CourseContainer />
                </Col>
            </Row>
        )

        return sidebar;
    }
}

export default MainPage;