import {useNavigate} from "react-router-dom";
import {IconButton, Tooltip} from "@chakra-ui/react";
import {useAuth} from "./session/AuthContext.tsx";
import {FaSignOutAlt} from "react-icons/fa";

export default function Logout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();  // login 함수 호출
      navigate("/dashBoard", { replace: true });  // 로그인 성공 시 대시보드로 이동
    } catch (error) {
      console.error("Login failed:", error);
      // 필요에 따라 에러 처리 추가 가능 (ex. 에러 메시지 표시)
    }
  }

  return (
    <div className="absolute top-4 right-4">
      {user &&
        <>
          {user}
          <Tooltip label="Log out" aria-label="A tooltip">
            <IconButton
              aria-label="Log out"
              icon={<FaSignOutAlt />}
              size="sm"
              colorScheme="red"
              variant="solid"
              isRound
              onClick={() => handleLogout()}
            />
          </Tooltip>
        </>
      }
    </div>
  )
}