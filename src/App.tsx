import React from 'react';
import Header from './components/header'
import './App.css';
import MainPage from './components/mainpage';
import CourseCreator from './components/coursecreator';
import LoginPage from './components/loginpage';
import { Route } from 'react-router';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      {/* <LoginPage /> */}
      <Route  path = "/courses" component = {MainPage}/>
      {/* <MainPage maxCols = {4} /> */}
      {/* <CourseCreator subjectId = {1}/> */}
    </React.Fragment>
    
  );
}

export default App;
