import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { posts } from "../../table/dashBoard/column.tsx";

function DashBoardDetail() {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_URL;
  const [resp, setData] = useState<posts | null>(null);

  const handleSubmit = () =>{

  }

  const handleChange = () =>{

  }

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
          setData(res.data[0]);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
        <div className="px-6 py-4">
          <input
            type="text"
            name="title"
            className="font-bold text-xl mb-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            value={resp?.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            className="text-gray-700 text-base bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            rows={6}
            value={resp?.content}
            onChange={handleChange}
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
