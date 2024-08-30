import React, { ChangeEvent } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

export type ServerFile = {
  id: number;
  originalname: string;
  filename: string;
  mimetype: string;
  size: number;
  postId: number | null;
  filepath: string;
}

type FileProps = {
  file: (File | ServerFile)[];
  setFile: React.Dispatch<React.SetStateAction<(File | ServerFile)[]>>;
};

export function FileUpload({ file, setFile }: FileProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files || []);
    setFile(fileList);
  };

  return (
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
        <Input
          type="file"
          multiple
          onChange={handleFileChange}
          display="none"
          id="file-upload"
        />
        <Button as="label" htmlFor="file-upload" colorScheme="blue" size="md">
          파일 선택
        </Button>
        {file.length && (
          <Box>
            <Text>선택된 파일:</Text>
            {file.map((f, index) => (
              <Text key={index}>
                {"name" in f ? f.name : f.originalname}
              </Text>
            ))}
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default FileUpload;