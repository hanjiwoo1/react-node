import {useNavigate} from "react-router-dom";
import {Box, Button, VStack} from "@chakra-ui/react";
import {BasicTable} from "../../table/dashBoard/BasicTable.tsx";
import {columns} from "../../table/dashBoard/column.tsx";
import {useEffect, useState} from "react";
import {fetchApi} from "../../lib/fetchApi.ts";

interface ResponseData {
  id: string;
  title: string;
  content: string;
  author: string;
  filepath: string;
  fileId: number;
}

interface ApiResponse {
  data: ResponseData[];
  ok:boolean;
}

function DashBoard() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;
  const [resp, setResp] = useState<ResponseData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi<ApiResponse>(`${baseUrl}/api/posts`, {});
        if (response.ok) {
          setResp(response.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <VStack spacing={4} align="stretch">
      <Box display="flex" justifyContent="flex-end" width="100%">
      <Button colorScheme="blue" onClick={() => navigate("/dashBoard/reg")}>
        등록
      </Button>
      </Box>
      <BasicTable
        columns={columns}
        data={resp}
      />
    </VStack>
  );
}

export default DashBoard;