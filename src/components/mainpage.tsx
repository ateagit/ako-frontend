import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "./sidebar";
import CourseContainer from "./coursecontainer";
import { Route } from "react-router-dom";

interface IState {
    subjectData: NodeData[];
    dataDepth: number;
}

interface IProps {
    maxCols: number;
    match: any
}

export interface NodeData {
    id: number
    name: string;
    children: NodeData[] | null;
}


class MainPage extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            subjectData: [],
            dataDepth: 0
        }
    }
    
    private getSubjects = () => {
        const url = "https://localhost:44383/api/Subjects";

        fetch(url,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }).then((response: any) => {
           return response.json();
        }).then((response: NodeData[]) => {

            let subjects: any[] = [];

            console.log(response);

            this.setState({
                subjectData: response
            })
        });
    }

    public componentDidMount() {
        this.getSubjects();
    }

    render() {
        console.log(this.props.match);
        const sidebar:any = (
            <SideBar listItems = {this.state.subjectData} />
            
        )

        const mainpage: any = (
            <React.Fragment>
                <Row>

                    <SideBar listItems = {this.state.subjectData} />
                    <Col>
                        <Route 
                            path ={`${this.props.match.url}/:mainSubject?/:subSubject?`}
                            render ={(routeProps: any) => (
                            <CourseContainer
                                mainSubject = {routeProps.match.params.mainSubject}
                                subSubject = {routeProps.match.params.subSubject}
                                /> )}
                                  />
                        {/* <CourseContainer /> */}
                    </Col>
                    
                </Row>
            </React.Fragment>
        )
        return mainpage;
    }
}

export default MainPage;