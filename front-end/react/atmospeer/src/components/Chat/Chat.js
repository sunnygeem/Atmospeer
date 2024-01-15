import React, { useState } from 'react';
import Youtube from '../Youtube/Youtube';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [youtubeURL, setURL] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(message);

    try {
      const response = await fetch(`http://localhost:3001/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message + '해당 분위기에 어울리는 유튜브 플레이리스트의 키워드를 노래라는 키워드를 포함해서 설명 없이, 한글로, 짧게 한 문장으로 적어줘' }),
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
      console.log(messageContent);

      // youtube link
      const response2 = await fetch(
        `http://localhost:3001/api/youtube?keyword=${encodeURIComponent(
          messageContent
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response2.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data2 = await response2.json();
      console.log('Youtube Data: ', data2.responseData);
      
      // Extracting the URL from responseData
      const youtubeURL =
        data2.responseData &&
        data2.responseData.match(/URL: (https:\/\/www\.youtube\.com\/watch\?v=[^\s]+)/)?.[1];
      console.log(youtubeURL);
      setURL(youtubeURL || 'N/A');
    } catch (error) {
      console.error('Error during fetch:', error);
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
      {/* <div>{youtubeURL}</div> */}

      {/* youtube 영상 띄우기 */}
      <Youtube youtubeURL={youtubeURL} />
    </div>
  );
}
