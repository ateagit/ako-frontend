import React from 'react';
import Header from './components/header'
import './App.css';
import MainPage from './components/mainpage';
import CourseCreator from './components/coursecreator';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />

      {/*<MainPage maxCols = {4} /> */}
      <CourseCreator />
    </React.Fragment>
    
  );
}

export default App;
