import React from 'react';
import Login from './components/Login/Login';
import Signup from './components/Login/Singup';
import Chat from './components/Chat/Chat';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>AtmosPEER</h1>
        
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/chat" component={Chat} />

        <nav>
          <ul>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <li>
              <Link to="/chat">채팅</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
};

export default App;
