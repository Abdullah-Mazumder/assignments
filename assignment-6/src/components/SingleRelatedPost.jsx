import { Link } from "react-router-dom";

const SingleRelatedPost = ({ post }) => {
  const { id, title, image, tags, createdAt } = post;
  return (
    <div className="card">
      <Link to={`/post/${id}`}>
        <img src={image} className="card-image" alt="" />
      </Link>
      <div className="p-4">
        <Link
          to={`/post/${id}`}
          className="text-lg post-title lws-RelatedPostTitle"
        >
          {title}
        </Link>
        {tags.length > 0 && (
          <div className="mb-0 tags">
            {tags.map((tag, index) => (
              <span key={tag}>
                #{tag}
                {tags.length !== index + 1 && ", "}
              </span>
            ))}
          </div>
        )}
        <p>{createdAt}</p>
      </div>
    </div>
  );
};

export default SingleRelatedPost;
