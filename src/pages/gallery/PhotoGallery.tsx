import {useEffect, useState} from "react";
import {fetchApi} from "../../lib/fetchApi.ts";
import './PhotoGallery.css';
import Post from "./Post.tsx";
import {posts} from "../../table/dashBoard/column.tsx";

export interface ResponseData {
  author: string;
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

export interface Photo {
  results: PhotoResult[];
}

// Update the Photo interface to use the PhotoResult type
const PhotoGallery= () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [file , setFile] = useState<Photo | null>(null);
  const [resp, setResp] = useState<ResponseData | null>(null);

  useEffect(() => {
    const filesData = async () => {
      try {
        const response = await fetchApi<Photo>(`${baseUrl}/api/file/getFiles`, {});
        setFile(response)
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    filesData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchApi<ResponseData>(`${baseUrl}/api/posts`, {});
        if ((response as ResponseData).ok) {
          if (Array.isArray(response.data)) {
            const updatedData = response.data.map((item) => {
              file?.results.forEach(result =>{
                if (item.fileId == result.id){
                  item.filepath = result.filepath
                }
              })
              return item;
            })
            setResp({ ...response, data: updatedData });
          }
        }
      } catch (e) {
        console.log('error : ', e)
      }
    }
    fetchData().catch(console.error);
  }, [file]);

  return (
    <>
      <Post resp={resp} />
    </>
);
}

export default PhotoGallery;