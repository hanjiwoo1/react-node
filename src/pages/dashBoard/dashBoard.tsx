import {Table} from "../../components/ui/table.tsx";
import {uploadFile} from "../../lib/fileApi.ts";

function dashBoard() {

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);
    await uploadFile(formData);
  };

  return(
    <>
      <div></div>
      <form encType='multipart/form-data' onSubmit={upload}>
        <input type='file' name='file'/>
        <button type='submit'>업로드</button>
      </form>
      <Table/>
    </>
  )
}

export default dashBoard;