import {useNavigate, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import {fetchApiGet} from "../../lib/fetchAPiGet.ts";
import FileUpload, {ServerFile} from "../../components/FileUpload.tsx";
import {uploadFile} from "../../lib/fileApi.ts";
import {fetchApi} from "../../lib/fetchApi.ts";
import {apiResponse} from "./DashBoardReg.tsx";

interface Post{
  title: string;
  content: string;
}

interface ApiResponse{
  data:{
    posts: Post[];
    files: File[];
  }
}

function DashBoardDetail() {
  const { id } = useParams();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<(File | ServerFile)[]>([]);
  const toast = useToast();
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApiGet<ApiResponse>(`${baseUrl}/api/posts/detail/${id}`);
      // console.log('response : ', response)
      setTitle(response.data.posts[0].title || '');
      setContent(response.data.posts[0].content || '');
      setFiles(response.data.files);
    }
    fetchData().catch(console.error);
  }, []);


  const handleFileUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const result = await uploadFile(formData);
    return result;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    handleFileUpload(files.filter((file): file is File => file instanceof File))
      .then((uploadResult) => {
        if (uploadResult.insertId) {
          updateData({title, content, id, insertId: uploadResult.insertId}).then(r => console.log(r));
        }
      })
      .catch((e) => {
        console.error("에러 발생", e);
      });
  };


  const updateData = async (data: {
    title: string;
    content: string;
    id: string | undefined;
    insertId: number | null;
  }) => {
    await fetchApi<apiResponse>(`${baseUrl}/api/posts/update`, data);
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
            onFilesSelected={setFiles}
            initialFiles={files}
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

export default DashBoardDetail;