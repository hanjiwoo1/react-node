import { ResponseData } from "./PhotoGallery.tsx";
import { Gallery, Item } from "react-photoswipe-gallery";

interface ImagesProps {
  resp?: ResponseData | null,
}

const Post = ({ resp }: ImagesProps) => {
  console.log('resp : ', resp);

  const samplePost = {
    user: {
      username: 'john_doe',
      profilePic: 'https://picsum.photos/500',
    },
    image: 'https://picsum.photos/500',
    likes: 128,
    comments: [
      { user: 'jane_doe', text: 'Nice photo!' },
      { user: 'another_user', text: 'Looks awesome!' },
    ],
    timestamp: '2 hours ago',
  };

  if (!resp || !Array.isArray(resp)) {
    console.error('Invalid response data:', resp);
    return <div>No data available</div>;
  }

  return (
    <div className="post">
      {resp.map((item, index) => {
        return (
          <div key={index} className="post">
            <div className="post-header">
              <img src={samplePost.user.profilePic} alt="User" className="profile-pic" />
              <span className="username">{item.author}</span>
            </div>
            <div className="post-image">
              <Gallery>
                <Item
                  // original={`${dir}${item.filepath}`}
                  original={`${item.filepath}`}
                  thumbnail={`${item.filepath}`}
                  width="1024"
                  height="768"
                >
                  {({ ref, open }) => (
                    <img ref={ref as unknown as React.RefObject<HTMLImageElement>} onClick={open} src={`${item.filepath}`} alt="Post" />
                  )}
                </Item>
              </Gallery>
            </div>
            <div className="post-actions">
              <button className="like-btn">❤️ Like</button>
              <button className="comment-btn">💬 Comment</button>
            </div>
            <div className="post-info">
              <span className="likes">{samplePost.likes} likes</span>
              <div className="comments">
                {samplePost.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <span className="comment-user">{comment.user}:</span> {comment.text}
                  </div>
                ))}
              </div>
              <span className="timestamp">{samplePost.timestamp}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Post;