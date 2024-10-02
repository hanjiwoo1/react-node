import {BasicTable} from "../../table/dashBoard/BasicTable.tsx";
import {columns} from "../../table/dashBoard/column.tsx";
import {useEffect, useState} from "react";
import {fetchApi} from "../../lib/fetchApi.ts";
import Nav from "../../components/common/Nav.tsx";
import Photo from "../photo/Photo.tsx";

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
    <div className="flex h-screen">
      {/* 사이드바 */}
      <Nav />
      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 overflow-y-auto bg-gray-200 p-4">
        {/* 그리드 컨테이너 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 왼쪽의 넓은 테이블 영역 */}
          <div className="lg:col-span-2 bg-white p-4 shadow rounded">
            <BasicTable columns={columns} data={resp} />
          </div>

          {/* 오른쪽의 작은 카드 영역 */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 shadow rounded"><Photo/></div>
            <div className="bg-white p-4 shadow rounded">Card 2</div>
            <div className="bg-white p-4 shadow rounded">Card 3</div>
            <div className="bg-white p-4 shadow rounded">Card 4</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashBoard;