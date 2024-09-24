
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
const Photo = () => {
  const images = [
    { src: 'https://picsum.photos/id/1018/1024/768', thumbnail: 'https://picsum.photos/id/1018/200/150', width: 1024, height: 768 },
    { src: 'https://picsum.photos/id/1015/1024/768', thumbnail: 'https://picsum.photos/id/1015/200/150', width: 1024, height: 768 },
    { src: 'https://picsum.photos/id/1019/1024/768', thumbnail: 'https://picsum.photos/id/1019/200/150', width: 1024, height: 768 },
  ];

  return (
    <Gallery>
      {images.map((image, index) => (
        <Item
          key={index}
          original={image.src}
          thumbnail={image.thumbnail}
          width={image.width}
          height={image.height}
        >
          {({ ref, open }) => (
            <img ref={ref as unknown as React.RefObject<HTMLImageElement>} onClick={open} src={image.thumbnail} alt={`Thumbnail ${index + 1}`} />
          )}
        </Item>
      ))}
    </Gallery>
  );
}

export default Photo;