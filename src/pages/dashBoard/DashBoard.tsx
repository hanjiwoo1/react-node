import {useEffect, useState} from "react";
import {columns, posts} from "../../table/dashBoard/column";
import {DataTable} from "../../table/dashBoard/DataTable";
import {useNavigate} from "react-router-dom";
import {fetchApi} from "../../lib/fetchApi";
import './ImageGalleryStyles.css'
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
    <>
      <div className="flex justify-end">
        <button
          className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-0.5"
          onClick={() => navigate("/dashBoard/reg")}
        >
          등록
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {!isLoading && !error && resp && (
        <>
          <DataTable
            columns={columns as ColumnDef<{ fileId: number }, unknown>[]}
            data={resp.data as unknown as { fileId: number }[]}
            photo={photo}
          />
        </>
      )}
    </>
  );
}


export default DashBoard;