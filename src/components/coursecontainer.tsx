import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import StarRatingComponent from 'react-star-rating-component';

const cardStyling = {
    
    margin: '50px auto 0px auto'
}
class CourseContainer extends React.Component {
    render() {

        const courseContainer:any = (

            // Split into different Card components: e.g. Video Card, Image Card, Text Card
            [1, 1, 1, 1, 1, 1].map(i => {
                return (
                    <Row style = {{margin: 0}}>
                        <Col md = {{span: 8, offset: 2}} xl = {{span: 6, offset: 3}}>
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