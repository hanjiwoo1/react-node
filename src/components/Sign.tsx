import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchApi} from "../lib/fetchApi.ts";

interface signData{
  userId: string;
  password: string;
  isSuccess: boolean;
}

export function Sign() {

  const baseUrl = import.meta.env.VITE_API_URL
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const data     = {
      userId: userId,
      password: password,
  };

    const response = await fetchApi<signData>(baseUrl+"/api/user/sign", data)
    if (response.isSuccess) {
      alert('회원가입에 성공하였습니다.');
      navigate('/');
    }else{
      alert('회원가입에 실패하였습니다.');
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">회원가입</h2>
        <form onSubmit={handleRegister}>
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-600">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sign;
