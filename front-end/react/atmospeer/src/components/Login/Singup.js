import React, { useState } from 'react';

export default function Signup() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [SignupAttemptCount, setSignupAttemptCount] = useState(0);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const password = e.target.pw.value;
        const name = e.target.name.value;
        
        const userInput = {
            id: id,
            password: password,
            name: name,
        };

        try {
            const response = await fetch(`http://localhost:3001/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInput),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const parsedData = JSON.parse(data.responseData);
            setIsSuccess(parsedData);
            setSignupAttemptCount((prevCount) => prevCount + 1);
            console.log('Signup Data: ', parsedData);
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <div className="Signup">
            {/* 회원가입 form */}
            <form onSubmit={onSubmitHandler}>
                <input name='id' />
                <input name='pw' />
                <input name='name' />
                <input type='submit' value='회원가입' />
            </form>

            {isSuccess ? (
      <div>
        <p>회원가입에 성공했습니다.</p>
      </div>
    ) : (
      <p>{SignupAttemptCount === 0 ? '회원가입' : '회원가입에 실패했습니다.'}</p>
    )}
        </div>
    );
}
