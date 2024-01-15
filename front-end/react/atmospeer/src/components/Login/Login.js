import React, { useState, useEffect } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [id, setID] = useState(null);
  const [loginAttemptCount, setLoginAttemptCount] = useState(0);

  // 유저 정보 전체를 받아오는 부분
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/user');
        const result = await response.json();
        const parsedData = JSON.parse(result.responseData);
        setData(parsedData);
        console.log('User Data: ', parsedData);
      } catch (error) {
        console.error('데이터 로딩 실패');
      }
    };
    fetchData();
  }, []);

  // 로그인 정보를 입력하면, 서버에 보내서 존재하는 정보인지 처리하는 부분
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    setID(id);
    const password = e.target.pw.value;

    const response = await fetch(
      `http://localhost:3001/api/login?id=${encodeURIComponent(
        id
      )}&password=${encodeURIComponent(password)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('App.js response', data);
    const parsedData = JSON.parse(data.responseData);
    setIsSuccess(parsedData);
    console.log('Login Data: ', parsedData);
    setLoginAttemptCount((prevCount) => prevCount + 1);

    if (parsedData) {
      // 로그인에 성공하면 App.js의 handleLogin 함수 호출
      onLoginSuccess();
    }
  };

  return (
    <div className="Login">
      {/* 로그인 form */}
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="id">ID </label>
          <input type="text" id="id" name="id" />
        </div>
        <div className="form-group">
          <label htmlFor="pw">PASSWORD </label>
          <input type="password" id="pw" name="pw" />
        </div>
        <input type="submit" value="로그인" />
      </form>

      {isSuccess ? (
        <div>
          <p>로그인에 성공했습니다.</p>
        </div>
      ) : (
        <p>{loginAttemptCount === 0 ? '로그인' : '로그인에 실패했습니다.'}</p>
      )}
    </div>
  );
};

export default Login;
