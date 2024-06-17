import {Table} from "../../components/ui/table.tsx";
import {uploadFile} from "../../lib/fileApi.ts";

function dashBoard() {

  const upload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.currentTarget.file.files[0]);
    await uploadFile(formData);
  };

  return(
    <>
      <form className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" encType="multipart/form-data"
            onSubmit={upload}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            파일 선택
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file" name="file"/>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            업로드
          </button>
        </div>
      </form>

      <Table/>
    </>
  )
}

export default dashBoard;