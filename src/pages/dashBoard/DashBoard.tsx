import {useNavigate} from "react-router-dom";
import {Box, Button, VStack} from "@chakra-ui/react";

function DashBoard() {
  const navigate = useNavigate();

  return (
    <VStack spacing={4} align="stretch">
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button
          colorScheme="blue"
          onClick={() => navigate("/dashBoard/reg")}
        >
          등록
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => navigate("/dashBoard/gallery")}
        >
          갤러리
        </Button>
      </Box>
    </VStack>
  );
}

export default DashBoard;