import React, { useState, useEffect } from 'react';

export default function Login () {
    const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [id, setID] = useState(null);
  const [loginAttemptCount, setLoginAttemptCount] = useState(0);

  // 유저 정보 전체를 받아오는 부분
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('http://localhost:3001/api/user');
        const result = await response.json();
        const parsedData = JSON.parse(result.responseData);
        setData(parsedData);
        console.log('User Data: ', parsedData);
      }
      catch(error){
        console.error("데이터 로딩 실패");
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

      const response = await fetch(`http://localhost:3001/api/login?id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('App.js response', data);
        const parsedData = JSON.parse(data.responseData);
        setIsSuccess(parsedData);
        console.log('Login Data: ', parsedData);
        setLoginAttemptCount((prevCount) => prevCount + 1);
};



return (
    <div className="Login">

      {/* 로그인 form */}
      <form onSubmit={onSubmitHandler}>
        <input name = 'id'/>
        <input name = 'pw'/>
        <input type='submit' value='로그인'/>
      </form>

      {/* 정보 출력: 로그인 성공하면 해당 유저의 정보를 출력하도록 */}
      {isSuccess ? (
      <div>
        <p>로그인에 성공했습니다.</p>
        <div>[유저 정보]</div>
        {data
          .filter((user) => user.id === id) // Replace loggedInUserId with the actual logged-in user's id
          .map((userData) => (
          <div key={userData.id}>
            <div>{userData.id}</div>
            <div>{userData.password}</div>
            <div>{userData.name}</div>
          </div>
        ))}
      </div>
    ) : (
      <p>{loginAttemptCount === 0 ? '로그인하세요.' : '로그인에 실패했습니다.'}</p>
    )}
    </div>

  );
};
