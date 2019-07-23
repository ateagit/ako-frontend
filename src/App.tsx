import React from 'react';
import logo from './logo.svg';
import Header from './components/header'
import './App.css';
import CourseContainer from './components/coursecontainer';
import SubjectSideBar from './components/subjectsidebar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SideBar from './components/sidebar';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Row>
        <Col md = {4}>
          <SideBar />
        </Col>
        <Col md = {8}>
          <CourseContainer />
        </Col>
      </Row>
      
    </React.Fragment>
    
  );
}

export default App;
