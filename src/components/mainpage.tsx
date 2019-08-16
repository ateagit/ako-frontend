import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "./sidebar";
import CourseContainer from "./coursecontainer";
import { Route, Link } from "react-router-dom";

interface IState {
    subjectData: NodeData[];
    dataDepth: number;
}

interface IProps {
    maxCols: number;
    match: any,
    location: any
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
        const url = "https://ako-api.azurewebsites.net/api/Subjects";

        fetch(url,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }).then((response: any) => {
           return response.json();
        }).then((response: NodeData[]) => {

            let subjects: any[] = [];
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
        console.log("LOCATION", this.props.location);
        const sidebar:any = (
            <SideBar listItems = {this.state.subjectData} />
            
        )
        
        const mainpage: any = (
            <React.Fragment>
                <Row>
                    
                    <SideBar listItems = {this.state.subjectData} />
                    {/* <Link to = {`${this.props.match.path}/computer-science`} >
                        yoyo
                    </Link> */}
                    <Col>
                    
                        <Route 
                            path ={`${this.props.match.path}/:mainSubject?/:subSubject?`}
                            render ={(routeProps: any) => (
                                
                                <React.Fragment>
                                    <CourseContainer
                                        mainSubject = {routeProps.match.params.mainSubject}
                                        subSubject = {routeProps.match.params.subSubject}
                                        match = {routeProps.match}
                                    /> 
                                </React.Fragment>
                            )}
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