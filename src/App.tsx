import React from 'react';
import Header from './components/header'
import './App.css';
import MainPage from './components/mainpage';
import CourseCreator from './components/coursecreator';
import LoginPage from './components/loginpage';
import { Route } from 'react-router';
import CourseViewer from './components/courseviewer';
import CourseCreatorEdit from './components/coursecreatoredit';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      {/* <LoginPage /> */}
      <Route path = "/courses" component = {MainPage}/>
      <Route path = "/view/:id" component = {CourseViewer} />
      {/* <MainPage maxCols = {4} /> */}
      <Route path = "/update/:id" component = {CourseCreatorEdit} />
    </React.Fragment>
    
  );
}

export default App;
