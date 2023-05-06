import { useDispatch, useSelector } from "react-redux";
import SingleRelatedPost from "./SingleRelatedPost";
import { useEffect } from "react";
import { fetchRelatedPosts } from "../features/relatedPosts/relatedPostsSlice";

const RelatedPostsContainer = ({ currentPostId, tags }) => {
  const dispatch = useDispatch();
  const { relatedPosts, isError, error, isLoading } = useSelector(
    (state) => state.relatedPosts
  );

  useEffect(() => {
    dispatch(fetchRelatedPosts({ tags, id: currentPostId }));
  }, [dispatch, currentPostId, tags]);
  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      {!isLoading && (
        <>
          {isError ? (
            <h1>{error}</h1>
          ) : (
            <>
              {relatedPosts.length > 0 ? (
                <>
                  <div className="space-y-4 related-post-container">
                    {relatedPosts.map((post) => (
                      <SingleRelatedPost key={post.id} post={post} />
                    ))}
                  </div>
                </>
              ) : (
                <h1>No Related Posts Found!</h1>
              )}
            </>
          )}
        </>
      )}
    </aside>
  );
};

export default RelatedPostsContainer;
