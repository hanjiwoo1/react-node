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
      <Item
        original={images[0].src}
        thumbnail={images[0].thumbnail}
        width={images[0].width}
        height={images[0].height}
      >
        {({ ref, open }) => (
          <img
            ref={ref as unknown as React.RefObject<HTMLImageElement>}
            onClick={open}
            src={images[0].thumbnail}
            alt="Thumbnail"
            style={{ cursor: 'pointer' }}
          />
        )}
      </Item>
      {images.slice(1).map((image, index) => (
        <Item
          key={index + 1}
          original={image.src}
          thumbnail={image.thumbnail}
          width={image.width}
          height={image.height}
        >
          {({ ref }) => <div ref={ref as unknown as React.RefObject<HTMLDivElement>} style={{ display: 'none' }} />}
        </Item>
      ))}
    </Gallery>
  );
};

export default Photo;
