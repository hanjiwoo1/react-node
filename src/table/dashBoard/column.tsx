import {ColumnDef} from "@tanstack/react-table";
import {Link} from "react-router-dom";

export type posts = {
  id:string,
  title : string,
  content : string,
  author : string,
}

export const columns: ColumnDef<posts>[] = [
  {
    accessorKey: "id",
    header: "No",
  },{
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      // console.log('row : ', row.original)
      return (
        <>
          <button className="float-left pl-0">
            <Link
              to={"/dashBoard/detail/" + row.original.id}
            >
              {row.original.title}
            </Link>
          </button>
        </>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "author",
    header: "Author",
  },

]