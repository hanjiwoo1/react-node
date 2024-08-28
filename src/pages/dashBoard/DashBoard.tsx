import {useEffect, useState} from "react";
import {columns, posts} from "../../table/dashBoard/column";
import {DataTable} from "../../table/dashBoard/DataTable";
import {useNavigate} from "react-router-dom";
import {fetchApi} from "../../lib/fetchApi";
import {Box, Button, Spinner, Text, VStack} from "@chakra-ui/react";
import {ColumnDef} from "@tanstack/react-table";

export interface ResponseData {
  ok: boolean;
  totalCount: number;
  data: posts[];
}

interface PhotoResult {
  id: number;
  originalname: string;
  filename: string;
  size: number;
  mimetype: string;
  postId: number;
  filepath: string;
}

// Update the Photo interface to use the PhotoResult type
export interface Photo {
  results: PhotoResult[];
}

function DashBoard() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [resp, setData] = useState<ResponseData | null>(null);
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchApi(`${baseUrl}/api/posts`, {});
        // @ts-expect-error: TypeScript error expected due to unknown type
        if (response.ok) {
          // @ts-expect-error: TypeScript error expected due to unknown type
          setData(response);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    }
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const filesData = async () => {
      try {
        const response = await fetchApi<Photo>(`${baseUrl}/api/file/getFiles`, {});
        console.log('response: ', response)
        setPhoto(response);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    filesData().catch(console.error);
  }, []);

  return (
    <VStack spacing={4} align="stretch">
      <Box display="flex" justifyContent="flex-end" width="100%">
        <Button
          colorScheme="blue"
          onClick={() => navigate("/dashBoard/reg")}
        >
          등록
        </Button>
      </Box>
      {isLoading && <Spinner size="xl" />}
      {error && <Text color="red.500">Error loading data</Text>}
      {!isLoading && !error && resp && (
        <Box width="100%">
          <DataTable
            columns={columns as ColumnDef<{ fileId: number }, unknown>[]}
            data={resp.data as unknown as { fileId: number }[]}
            photo={photo}
          />
        </Box>
      )}
    </VStack>
  );
}

export default DashBoard;