import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SinglePost from "./SinglePost";

import { fetchPosts } from "../features/posts/postsSlice";

const PostsContainer = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, error } = useSelector(
    (state) => state.posts
  );
  const { filterByLikeOrNewest, filterBySaveStatus } = useSelector(
    (state) => state.filter
  );

  const filterWithSaveStatus = (post) => {
    if (filterBySaveStatus) {
      return post.isSaved === true;
    }
    return true;
  };

  const filterWithLikeOrNewest = (postArray) => {
    const copiedPostArray = JSON.parse(JSON.stringify(postArray));
    if (filterByLikeOrNewest === "newest") {
      return copiedPostArray.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });
    } else if (filterByLikeOrNewest === "most_liked") {
      return copiedPostArray.sort((post1, post2) => {
        return post2.likes - post1.likes;
      });
    } else return postArray;
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <main className="post-container" id="lws-postContainer">
      {isLoading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          {isError ? (
            <>
              <h1>{error}</h1>
            </>
          ) : (
            <>
              {filterWithLikeOrNewest(posts).filter(filterWithSaveStatus)
                .length > 0 ? (
                <>
                  {filterWithLikeOrNewest(posts)
                    .filter(filterWithSaveStatus)
                    .map((post) => (
                      <SinglePost key={post.id} post={post} />
                    ))}
                </>
              ) : (
                <h1>No Post Found!</h1>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};

export default PostsContainer;
