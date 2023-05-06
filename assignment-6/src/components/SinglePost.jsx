import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  const { id, title, image, tags, likes, isSaved, createdAt } = post;
  return (
    <>
      <div className="lws-card">
        <Link to={`/post/${id}`}>
          <img src={image} className="lws-card-image" alt="" />
        </Link>
        <div className="p-4">
          <div className="lws-card-header">
            <p className="lws-publishedDate">{createdAt}</p>
            <p className="lws-likeCount">
              <i className="fa-regular fa-thumbs-up"></i>
              {likes}
            </p>
          </div>
          <Link to={`/post/${id}`} className="lws-postTitle">
            {title}
          </Link>
          {tags.length > 0 && (
            <div className="lws-tags">
              {tags.map((tag, index) => (
                <span key={tag}>
                  #{tag}
                  {tags.length !== index + 1 && ","}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <span className={`lws-badge`}>{isSaved ? "Saved" : "Save"}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
