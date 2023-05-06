import { useDispatch } from "react-redux";

import { giveLikeHandler, toggleSaveStatus } from "../features/post/postSlice";

const PostDetails = ({ post, isLoading, isError, error }) => {
  const dispatch = useDispatch();
  const { title, image, tags, likes, isSaved, description, id } = post;
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {isError ? (
            <h1>{error}</h1>
          ) : (
            <>
              <main className="post">
                <img
                  src={image}
                  alt="githum"
                  className="w-full rounded-md"
                  id="lws-megaThumb"
                />
                <div>
                  <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
                    {title}
                  </h1>
                  {tags?.length > 0 && (
                    <div className="tags" id="lws-singleTags">
                      {tags.map((tag, index) => (
                        <span key={tag}>
                          #{tag}
                          {tags.length !== index + 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="btn-group">
                    <button
                      className="like-btn"
                      id="lws-singleLinks"
                      onClick={() =>
                        dispatch(giveLikeHandler({ id, value: likes + 1 }))
                      }
                    >
                      <i className="fa-regular fa-thumbs-up"></i> {likes}
                    </button>
                    <button
                      className={`save-btn ${isSaved && "active"}`}
                      id="lws-singleSavedBtn"
                      onClick={() =>
                        dispatch(toggleSaveStatus({ id, value: !isSaved }))
                      }
                    >
                      <i className="fa-regular fa-bookmark"></i>
                      {isSaved ? " Saved" : " Save"}
                    </button>
                  </div>
                  <div className="mt-6">
                    <p>{description}</p>
                  </div>
                </div>
              </main>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PostDetails;
