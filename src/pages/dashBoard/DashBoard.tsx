import {useEffect, useMemo, useState} from "react";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {columns, posts} from "../../table/dashBoard/column.tsx";
import {DataTable} from "../../table/dashBoard/DataTable.tsx";
import {useNavigate} from "react-router-dom";

export interface ResponseData {
  ok: boolean;
  totalCount: number;
  data: posts[];
}

function DashBoard() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [resp, setData] = useState<ResponseData | null>(null);

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    columns,
    data: !error && !isLoading && resp ? resp.data : defaultData,
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    pageCount: !error && !isLoading && resp ? Math.ceil(resp.totalCount / pageSize) : -1,
    state: { pagination },
  });

  // console.log('table : ', table)

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res: ResponseData) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.error(err);
      });
  }, [pageIndex, pageSize]);

  return (
    <>
      {/*<form*/}
      {/*  className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"*/}
      {/*  encType="multipart/form-data"*/}
      {/*  onSubmit={upload}*/}
      {/*>*/}
      {/*  <div className="mb-4">*/}
      {/*    <label className="block text-gray-700 text-sm font-bold mb-2">*/}
      {/*      파일 선택*/}
      {/*    </label>*/}
      {/*    <input*/}
      {/*      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
      {/*      type="file"*/}
      {/*      name="file"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className="flex items-center justify-between">*/}
      {/*    <button*/}
      {/*      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"*/}
      {/*      type="submit"*/}
      {/*    >*/}
      {/*      업로드*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</form>*/}
      <div className="flex justify-end">
        <button
          className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-0.5"
          onClick={() => navigate('/dashBoard/reg')}
        >
          등록
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading data</p>}
      {!isLoading && !error && resp && (
        <DataTable columns={columns} data={resp.data} />
      )}
    </>
  );
}

export default DashBoard;