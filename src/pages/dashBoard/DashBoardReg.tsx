import React, { useState } from "react";
import { uploadFile } from "../../lib/fileApi.ts";
import { fetchApi } from "../../lib/fetchApi.ts";
import { useNavigate } from "react-router-dom";
import FileUpload, {ServerFile} from "../../components/FileUpload.tsx";
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

const baseUrl = import.meta.env.VITE_API_URL;

interface apiResponse {
  ok: boolean;
  data: {
    id: number;
    title: string;
    content: string;
    fileId: number;
  };
  error?: string;
}

function DashBoardReg() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<(File | ServerFile)[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length < 1) {
      toast({
        title: "파일을 업로드하세요.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const uploadResult = await handleFileUpload(files.filter((file): file is File => file instanceof File));
      if (uploadResult.insertId) {
        await insertData({ title, content, insertId: uploadResult.insertId });
      }
    } catch (e) {
      console.error("에러 발생", e);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const result = await uploadFile(formData);
    return result;
  };

  const insertData = async (data: {
    title: string;
    content: string;
    insertId: number | null;
  }) => {
    await fetchApi<apiResponse>(`${baseUrl}/api/posts/insert`, data);
    navigate("/dashBoard", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxW="sm"
        mx="auto"
        bg="white"
        shadow="md"
        rounded="lg"
        overflow="hidden"
        mt="4"
        p="6"
      >
        <VStack spacing="4">
          <FormControl id="title">
            <FormLabel>제목</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              borderColor="gray.300"
              focusBorderColor="blue.500"
            />
          </FormControl>
          <FormControl id="content">
            <FormLabel>내용</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              borderColor="gray.300"
              focusBorderColor="blue.500"
              rows={6}
            />
          </FormControl>
          <FileUpload
            file={files}
            setFile={setFiles}
          />
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            mt="4"
            size="md"
          >
            저장하기
          </Button>
        </VStack>
      </Box>
    </form>
  );
}

export default DashBoardReg;
