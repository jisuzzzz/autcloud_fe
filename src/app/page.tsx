'use client'

export default function Home() {
  // const handleHTTPPOST = async () => {
  //   try {
  //     const res = await fetch('/api/test', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(a)
  //     })
  //     const result = await res.json()
  //     console.log(result)
  //   } catch (error) {
  //     console.error('Error:', error)
  //   }
  // }
  const handleSignUp= async () => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(b)
      })
      const result = await res.json()
      console.log(result)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const a =
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone_num": "+1234567890",
      "verified": true,
      "create_dt": "2025-03-28T12:34:56Z"
    }

  const b =
    {
      email : "meked@naver.com",
      password : "123456",
      name : "jisu",
      phone_num : "010-6780-1172" 
    }
  
    
  return (
    <div>
      <h1>API 테스트</h1>
      {/* <button onClick={handleHTTPPOST}>API 호출</button> */}
      <button onClick={handleSignUp}>signup API</button>
    </div>
  );
}
