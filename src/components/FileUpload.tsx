import React, {ChangeEvent} from "react";

type FileProps ={
  file:File[];
  setFile: React.Dispatch<React.SetStateAction<File[]>>;
}
export function FileUpload({file, setFile}:FileProps){

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files || []);
    setFile(fileList);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <div>
        {file.length > 0 && (
          <ul>
            {file.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FileUpload;