import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import {fetchApi} from "../../lib/fetchApi.ts";
import {Files} from "../../type/data.ts";
import {useEffect, useState} from "react";

const Photo = () => {

  const baseUrl = import.meta.env.VITE_API_URL;
  const [photoData, setPhotoData] = useState<Files[]>();
  // const images = [
  //   { src: 'https://picsum.photos/id/1018/1024/768', thumbnail: 'https://picsum.photos/id/1018/200/150', width: 1024, height: 768 },
  //   { src: 'https://picsum.photos/id/1015/1024/768', thumbnail: 'https://picsum.photos/id/1015/200/150', width: 1024, height: 768 },
  //   { src: 'https://picsum.photos/id/1019/1024/768', thumbnail: 'https://picsum.photos/id/1019/200/150', width: 1024, height: 768 },
  // ];

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await fetchApi<{results: Files[]}>(baseUrl + "/api/file/getFiles", {});
        if(response){
          setPhotoData(response.results);
        }
      }catch(err){
        console.log('PhotoData fetch error : ', err)
      }
    }
      fetchData().catch(console.error);


  }, []);

  return (
    <Gallery>
      {photoData?.map((image, index) => (
        <Item
          key={index}
          original={image.filepath}
          thumbnail={image.filepath}
          width={1024}
          height={764}
        >
          {({ ref, open }) => (
            <img
              ref={ref as unknown as React.RefObject<HTMLImageElement>}
              onClick={open}
              src={image.filepath}
              alt="Thumbnail"
              style={{ cursor: 'pointer' }}
            />
          )}
        </Item>
      ))}
    </Gallery>
  );
};

export default Photo;
