import React from 'react';
import Login from './components/Login/Login';
import Signup from './components/Login/Singup';

const App = () => {
  return(
    <div className = "App">
      <h1>AtmosPEER</h1>
      <Signup />
      <Login />
      </div>
  );

};

export default App;
