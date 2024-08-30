import { useParams } from "react-router-dom";
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchApiGet<ApiResponse>(`${baseUrl}/api/posts/detail/${id}`);
      // console.log('response : ', response)
      setTitle(response.data.posts[0].title || '');
      setContent(response.data.posts[0].content || '');
      setFiles([response.data.files[0]]);
    }
    fetchData().catch(console.error);
  }, []);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your submit logic here
    toast({
      title: "저장되었습니다.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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

export default DashBoardDetail;