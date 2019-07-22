import React from 'react';
import logo from './logo.svg';
import Header from './components/header'
import './App.css';
import CourseContainer from './components/coursecontainer';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <CourseContainer />
    </React.Fragment>
    
  );
}

export default App;
