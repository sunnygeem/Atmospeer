import React, { useState } from 'react';
import Login from './components/Login/Login';
import Signup from './components/Login/Singup';
import Chat from './components/Chat/Chat';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'; // App.css 파일 추가

// const Home = () => (
//   <div>
//     <h2>AtmosPEER</h2>
//   </div>
// );

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // 로그인 성공 시 호출되는 함수
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 로그아웃 시 호출되는 함수
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header>
        <h1><Link to="/">AtmosPEER</Link></h1>
        {isLoggedIn ? (
          <nav>
            <ul>
              <li><Link to="/chat">채팅</Link></li>
              <li><button onClick={handleLogout}>로그아웃</button></li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul>
              <li><button><Link to="/login">로그인</Link></button></li>
              <li><button><Link to="/signup">회원가입</Link></button></li>
            </ul>
          </nav>
        )}
      </header>

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLogin} />}
        />
        <Route
          path="/chat"
          element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
