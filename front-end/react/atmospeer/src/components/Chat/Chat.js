import React, { useState } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(message);

    try {
      const response = await fetch(`http://localhost:3001/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message }),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();

    // responseData에서 이스케이프 문자를 처리하고 JSON으로 파싱
    const unescapedData = data.responseData.replace(/\\n/g, '\n');
    const responseData = JSON.parse(unescapedData);

    // message에 해당하는 정보만 추출
    const messageContent = responseData?.choices?.[0]?.message?.content || 'N/A';


  // 문자열로 변환하여 화면에 표시
  setResponse(messageContent);
    } catch (error) {
      console.error('Error during fetch:', error);
      setResponse('Error during fetch. Please check your network connection.');
    }
  };

  return (
    <div className='Chat'>
      <form onSubmit={onSubmitHandler}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
      <div>{JSON.stringify(response)}</div>
    </div>
  );
}
