import React from 'react';
import Header from './components/header'
import './App.css';
import MainPage from './components/mainpage';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <MainPage maxCols = {4} />
      
    </React.Fragment>
    
  );
}

export default App;
