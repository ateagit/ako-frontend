import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const cardStyling = {
    
    margin: '50px auto 0px auto'
}
class CourseContainer extends React.Component {
    render() {

        const courseContainer:any = (

            // Split into different Card components: e.g. Video Card, Image Card, Text Card
            <Row >
                <Col md = {{span: 8, offset: 2}}>
                    <Card style = {cardStyling} >
                        <Card.Body>
                            <Card.Title>
                                This is a title.
                            </Card.Title>
                            <Card.Text>
                                This is some text that accompanies the title. I will drag on because I need to fill in some space
                                thanks for dropping by. 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
            
        );
        return courseContainer;
    }
}


export default CourseContainer;