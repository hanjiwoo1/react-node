import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./session/AuthContext.tsx"; // useAuth 훅을 불러옴
import {Box, Button, FormControl, FormLabel, Heading, Input, VStack,} from "@chakra-ui/react";

export function LoginForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, user, loading } = useAuth(); // useAuth 훅을 통해 login 함수 사용

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashBoard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await login({ userId, password }); // login 함수 호출
      navigate("/dashBoard", { replace: true }); // 로그인 성공 시 대시보드로 이동
    } catch (error) {

      console.error("Login failed:", error);
    }
  };

  return (
    <Box bg="gray.100" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" p="8" rounded="md" shadow="md" w="md">
        <Heading as="h2" size="lg" mb="6" textAlign="center">
          로그인
        </Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing="4">
            <FormControl id="userId">
              <FormLabel>아이디</FormLabel>
              <Input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                focusBorderColor="blue.500"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>비밀번호</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                focusBorderColor="blue.500"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              로그인
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              width="full"
              onClick={() => navigate("/sign")}
            >
              회원가입
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm;
