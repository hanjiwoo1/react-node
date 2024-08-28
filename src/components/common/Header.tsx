import {Box, Flex, Heading, HStack, Spacer} from '@chakra-ui/react';
import Logout from "../Logout.tsx";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box bg="lightskyblue" p={4} color="white">
      <Flex alignItems="center">
        <Heading
          size="md"
          onClick={() => {
            navigate('/')
          }}
        >Home
        </Heading>
        <Spacer />
        <HStack spacing={4}>
          <Logout />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;