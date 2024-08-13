import {useEffect, useState} from "react";
import {uploadFile} from "../../lib/fileApi.ts";
import {fetchApi} from "../../lib/fetchApi.ts";
import {useNavigate} from "react-router-dom";
import FileUpload from "../../components/FileUpload.tsx";

const baseUrl = import.meta.env.VITE_API_URL;

interface apiResponse {
  ok: boolean;
  data: {
    id : number;
    title: string;
    content: string;
    fileId: number;
  };
  error?: string;
}
// TODO 파일업로드기능 만들고 등록화면과 디테일 화면에서 공통으로 쓰는 것들 컴포넌트화 할것
function DashBoardReg() {

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('files : ', files)
  }, [files]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title',title)
    formData.append('content',content)

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const result = await uploadFile(formData);

      //TODO build error 추후 삭제예정
      if (result === '임시') {
        await insert(result);
      }
    } catch(e) {
      console.log('error : ', e)
    }
    // await insert(data); // 데이터 인서트
  };

  const insert = async (data: { title: string; content: string; insertId: number | null }) => {

    const result = await fetchApi<apiResponse>(`${baseUrl}/posts/insert`, data);
    if (data.insertId !== null) {
      updateFileTable(result); // 파일이 있을 때만 파일 테이블 업데이트
    }

    navigate("/dashBoard", { replace: true });
  };

  const updateFileTable = async (result: apiResponse) => {
    await fetchApi(`${baseUrl}/file/update`, result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
        <div className="px-6 py-4">
          <input
            type="text"
            name="title"
            className="font-bold text-xl mb-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            name="content"
            className="text-gray-700 text-base bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            rows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <FileUpload
          file={files}
          setFile={setFiles}
        />
        <div className="px-6 py-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            저장하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default DashBoardReg;
