import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import StarRatingComponent from 'react-star-rating-component';
import { NodeData } from './mainpage';


interface IState {
    subjectData: NodeData[],
    courses: any[];
}

interface IProps {
    mainSubject: string,
    subSubject: string
}

const cardStyling = {
    margin: '50px auto 0px auto',
    borderRadius: "10px",
    border: "1px solid #ececec"
}


class CourseContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        
        this.state = {
            subjectData: [],
            courses: []
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
            this.getCourses(response);
        });
    }

    private formattedString(str: string) {
        str = str.replace(/-/g,' ');

        return str;
    }

    private getCourses = (subjectData: NodeData[]) => {
        let {mainSubject, subSubject} = this.props;

        let subjectId: number | undefined = undefined;
        if(mainSubject == undefined) {
            // If there is no main subject in route
            alert("No main subject") 
        } 

        // Replace - with space
        mainSubject = this.formattedString(mainSubject);

        // Check if a subject given exists in db
        const mainSub = subjectData.find(s => s.name.toLowerCase() == mainSubject);

        // If it isnt found, return
        if(mainSub == undefined) {
            alert("Bad URL")
            return;
        } 


        // If secondary route is undefined or main sub has no children, then search for main sub.
        if(subSubject == undefined || mainSub.children == null) {
            subjectId = mainSub.id
        } else {
            subSubject = this.formattedString(mainSubject);
            const subSub = mainSub.children.find(s => s.name.toLowerCase() == subSubject);

            if(subSub == undefined) {
                alert("Bad URL")
                return
            }

            subjectId = subSub.id;
        }
        let url: string = "https://localhost:44383/api"
        if(subjectId == undefined) {
            url += "/Courses"
        } else {
            url += "/Subjects/" + subjectId + "/Courses"
        }

        fetch(url,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }).then((response: any) => {
           return response.json();
        }).then((response: any) => {
    
            this.setState({
                courses: response.pop().course
            })
        });
    }

    componentDidMount() {
        this.getSubjects();
    }
    

    render() {
        const courseContainer:any = (

            // Split into different Card components: e.g. Video Card, Image Card, Text Card
            this.state.courses.map(course => {
                return (
                    <Row style = {{margin: 0}}>
                        <Col md = {{span: 10, offset: 1}} >
                            <Card style = {cardStyling} >
                                <Card.Body>
                                    <Card.Title>
                                        {course.title}
                                    </Card.Title>
                                    <Card.Text>
                                        Course Creator: {course.creatorName == null ? course.creatorName : "Anonymous"}
                                    </Card.Text>
                                    <Row>
                                        <Col style = {{fontSize: "23px", height: "100%"}}>
                                            <StarRatingComponent name="rate1" starCount={5} value={course.rating} />
                                        </Col>
                                        <Col style = {{textAlign: "right"}}>
                                            <Button variant="outline-primary"> Start Course </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                    </Row>);
                })
            
            
        );
        return courseContainer;
    }
}


export default CourseContainer;