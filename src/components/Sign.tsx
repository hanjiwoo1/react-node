import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../lib/fetchApi.ts";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {SignData} from "../type/data.ts";

export function Sign() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "비밀번호 오류",
        description: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const data = {
      userId: userId,
      password: password,
    };

    const response = await fetchApi<SignData>(baseUrl + "/api/user/sign", data);
    if (response.isSuccess) {
      toast({
        title: "회원가입 성공",
        description: "회원가입에 성공하였습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } else {
      toast({
        title: "회원가입 실패",
        description: "회원가입에 실패하였습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.100" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" p="8" rounded="md" shadow="md" w="md">
        <Heading as="h2" size="lg" mb="6" textAlign="center">
          회원가입
        </Heading>
        <form onSubmit={handleRegister}>
          <VStack spacing="4">
            <FormControl id="userId">
              <FormLabel>사용자명</FormLabel>
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
            <FormControl id="confirmPassword">
              <FormLabel>비밀번호 확인</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                focusBorderColor="blue.500"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              회원가입
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default Sign;
