import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import {fetchApi} from "../../lib/fetchApi.ts";
import {Files} from "../../type/data.ts";
import {useEffect, useState} from "react";
import React from 'react';

const Photo = () => {
  const baseUrl = import.meta.env.VITE_IMG_URL;
  const [photoData, setPhotoData] = useState<Files[]>();

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
      {photoData?.map((photo, index) => (
        <Item
          key={index}
          original={`${baseUrl}/${photo.filepath}`} // 클릭 했을때 확대 되는 사진
          thumbnail={`${baseUrl}/${photo.filepath}`} // 썸네일
          width={607.5}
          height={1080}
        >
          {({ ref, open }) => (
            index === 0 ? (
              <img
                ref={ref as unknown as React.RefObject<HTMLImageElement>}
                onClick={open}
                src={`${baseUrl}/${photo.filepath}`} // 첫 번째 이미지 데이터 사용
                alt="Thumbnail"
                className="w-1/6 h-auto"
              />
            ) : (
              <span ref={ref as unknown as React.RefObject<HTMLSpanElement>} onClick={open} style={{ display: 'none' }} />
            )
          )}
        </Item>
      ))}
    </Gallery>
  );
};

export default Photo;
