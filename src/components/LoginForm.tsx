import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {

  const baseUrl = "http://localhost:8080";
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /**
   * credentials: 'include' 옵션을 주지 않으면 백엔드에서 세션 값을 정상적으로 받아올 수 없습니다.
   * 로그인 요청에서는 반드시 이 옵션을 사용하여 세션 쿠키를 포함해야 합니다.
   */
  useEffect(() => {
    fetch(baseUrl + `/authCheck`, {
      credentials: 'include' // 세션 쿠키 포함
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin == true) {
          // setMode("WELCOME");
          console.log('세션있음 : ');
        } else {
          // setMode("LOGIN");
          console.log('로그인 필요 : ');
          navigate("/", { replace: true });
        }
      });
  }, []);

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const response = await fetch(
      baseUrl +`/login`,
      {
        method: "POST",
        credentials: 'include', // 세션 쿠키 포함
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
    // console.log('result : ', result);

    // 로그인 성공 시 다음 페이지로 이동
    if (result.ok) {
      // navigate('/dashboard'); // 이동할 경로 설정
      console.log('로그인성공 : ', )
    }
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
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-0.5"
            onClick={() => navigate('/sign')}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
