// import 'photoswipe/dist/photoswipe.css'
//
// import { Gallery, Item } from 'react-photoswipe-gallery'
//
// interface MyGalleryProps {
//   photo: Array<{ original: string, thumbnail: string, width: string, height: string }>
// }
//
// const MyGallery: React.FC<MyGalleryProps> = ({ photo }) => (
//   <Gallery>
//     {photo && photo.map((item, index) => {
//       return (
//         <Item
//           key={index}
//           original={item.original}
//           thumbnail={item.original}
//           width="1024"
//           height="768"
//         >
//           {({ ref, open }) => (
//             <img ref={ref} onClick={open} src={item.thumbnail} />
//           )}
//         </Item>
//       )
//     })}
//   </Gallery>
// )
//
// export default MyGallery;