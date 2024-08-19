import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './session/AuthContext.tsx';  // useAuth 훅을 불러옴

export function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, user, loading } = useAuth();  // useAuth 훅을 통해 login 함수 사용

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashBoard', {replace: true});
    }
  }, [user, loading, navigate]);

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await login({ userId, password });  // login 함수 호출
      navigate("/dashBoard", { replace: true });  // 로그인 성공 시 대시보드로 이동
    } catch (error) {
      console.error("Login failed:", error);
      // 필요에 따라 에러 처리 추가 가능 (ex. 에러 메시지 표시)
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
