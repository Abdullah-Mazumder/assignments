import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navigator from "../components/Navigator";
import PostDetails from "../components/PostDetails";
import RelatedPostsContainer from "../components/RelatedPostsContainer";
import { fetchPost } from "../features/post/postSlice";

const SinglePostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading, isError, error } = useSelector(
    (state) => state.post
  );
  const { tags, id } = post;

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [dispatch, postId]);
  return (
    <>
      <Navigator />
      <section className="post-page-container">
        <PostDetails
          post={post}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
        <RelatedPostsContainer currentPostId={id} tags={tags || []} />
      </section>
    </>
  );
};

export default SinglePostDetails;
