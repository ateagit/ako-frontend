import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import StarRatingComponent from 'react-star-rating-component';


interface IState {

}

interface IProps {
}

const cardStyling = {
    margin: '50px auto 0px auto',
    borderRadius: "10px",
    border: "1px solid #ececec"
}

class CourseContainer extends React.Component<IProps, IState> {
    render() {

        const courseContainer:any = (

            // Split into different Card components: e.g. Video Card, Image Card, Text Card
            [1, 1, 1, 1, 1, 1].map(i => {
                return (
                    <Row style = {{margin: 0}}>
                        <Col md = {{span: 10, offset: 1}} >
                            <Card style = {cardStyling} >
                                <Card.Body>
                                    <Card.Title>
                                        Course Title
                                    </Card.Title>
                                    <Card.Text>
                                        Course Description.
                                    </Card.Text>
                                    <Row>
                                        <Col style = {{fontSize: "23px", height: "100%"}}>
                                            <StarRatingComponent name="rate1" starCount={5} value={3.5} />
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