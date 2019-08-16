import React, { useState } from 'react';
import Header from './components/header'
import './App.css';
import MainPage from './components/mainpage';
import LoginPage from './components/loginpage';
import { Route, Redirect } from 'react-router';
import CourseViewer from './components/courseviewer';
import CourseCreatorEdit from './components/coursecreatoredit';
import CourseCreator from './components/coursecreator';
import image from './components/logo.png';

interface IState {
  authenticate: boolean;
}

class App extends React.Component<{}, IState>  {
  constructor(props: any) {
    super(props);
    this.state = {
      authenticate: false
    }
  }

  public setAuthenticate = () => {
    this.setState((prevState:any) => {
      return {authenticate: true}
    })
    // window.location.assign("/courses")
  }
render() {
  return (
    <React.Fragment>
      <Header />
      
      
      {this.state.authenticate ? 
      <React.Fragment>
        <Redirect to ="/courses" />
        <Route path = "/courses" component = {MainPage}/>
      <Route path = "/view/:id" component = {CourseViewer} />
      <Route 
          path ={`/login`}
          render ={(routeProps: any) => (
              <LoginPage setAuthenticate = {this.setAuthenticate}/>
          )}
      />
      <Route path = "/update/:id" component = {CourseCreatorEdit} /> 
      <Route path = "/create" component = {CourseCreator} /> 
      </React.Fragment>
      :
      <React.Fragment>
      <Route 
      path ={`/login`}
      render ={(routeProps: any) => (
          <LoginPage setAuthenticate = {this.setAuthenticate}/>
      )}
      />

      <Route 
      path ={``}
      component = {mainPage}
      />

</React.Fragment>
      }
      {/* <LoginPage />
      <Route path = "/courses" component = {MainPage}/>
      <Route path = "/view/:id" component = {CourseViewer} />
      <Route 
          path ={`/login`}
          render ={(routeProps: any) => (
              <LoginPage setAuthenticate = {setAuthenticate}/>
          )}
      />
      <Route path = "/update/:id" component = {CourseCreatorEdit} /> */}
      {/* <Route path = "/login" render = (){LoginPage} /> */}
      {/* <MainPage maxCols = {4} /> */}
      
      <div id="google_translate_element"></div>
    </React.Fragment>
    
  );
    }
}

function mainPage(props: any) {
  return <div>
    <div style = {{textAlign: "center"}}>
    <img
          src = {image}
          style = {{width: "auto", height: "auto"}}
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
      />  
      <h1>Please login</h1>
    </div>
  </div> 
}

export default App;
