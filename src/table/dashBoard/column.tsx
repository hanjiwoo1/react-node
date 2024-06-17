import {ColumnDef} from "@tanstack/react-table";

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