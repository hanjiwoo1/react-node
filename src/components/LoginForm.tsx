import {useState} from "react";

export function LoginForm() {

  const loginUrl = "http://localhost:8080/user/login";
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () =>{

    // @ts-ignore
    event.preventDefault();

    // console.log('userid : ', userId)
    // console.log('userid : ', password)

    const response = await fetch(
      loginUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
        }),
      }
    );
    const result = await response.json();
    console.log('result : ', result);

  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-gray-600">사용자명</label>
            <input
              type="text"
              id="userId"
              name="userId"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;