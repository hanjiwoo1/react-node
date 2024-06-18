import {useState} from "react";
import {uploadFile} from "../../lib/fileApi.ts";
import {fetchApi} from "../../lib/fetchApi.ts";

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

function DashBoardReg() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = e.currentTarget.file as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      formData.append("file", fileInput.files[0]);
      const result = await uploadFile(formData);
      const data = {
        title : title,
        content : content,
        insertId : result.insertId, // file 테이블에서 리턴된 아이디
      }
      await insert(data);
    }
  };
  
  const insert = async (data: { title: string; content: string; insertId: number; }) =>{
    const result = await fetchApi<apiResponse>(`${baseUrl}/posts/insert`, data);
    updateFileTable(result);
  }

  const updateFileTable = async (result:apiResponse) => {
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            파일 선택
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            name="file"
          />
        </div>
        {/*<div className="flex items-center justify-between">*/}
        {/*  <button*/}
        {/*    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"*/}
        {/*    type="submit"*/}
        {/*  >*/}
        {/*    업로드*/}
        {/*  </button>*/}
        {/*</div>*/}
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
