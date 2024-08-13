import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_API_URL;

function DashBoardDetail() {
  const { id } = useParams();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

    useEffect(() => {
      fetch(`${baseUrl}/posts/detail/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          setTitle(res.data.posts[0].title)
          setContent(res.data.posts[0].content)
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

   const handleSubmit = () =>{

    }
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

export default DashBoardDetail;
