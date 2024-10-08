import React, {ChangeEvent, useEffect} from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import {Files} from "../type/data.ts";

type FileUploadProps = {
  onFilesSelected: (files: (File | Files)[]) => void;
  initialFiles?: (File | Files)[];
};

export function FileUpload({ onFilesSelected, initialFiles = [] }: FileUploadProps) {
  const [files, setFiles] = React.useState<(File | Files)[]>([]);

  useEffect(() => {
    if (initialFiles.length > 0) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filesList = Array.from(e.target.files || []);
    setFiles(filesList);
    onFilesSelected(filesList);
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
        {files.length && (
          <Box>
            <Text>선택된 파일:</Text>
            {files.map((f, index) => (
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