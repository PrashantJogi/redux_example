import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";
import { fetchPost } from "../Slice/postSlice";
import { Spinner } from "./Spinner";
import {
 
  selectPostIds,
  selectPostById,
} from "../Slice/postSlice";


const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) =>selectPostById(state, postId));
  
  return (
    <article className="post-excerpt">
      <h3>{post.title && post.title}</h3>
      <div>
        <PostAuthor userId={post.user && post.user} />
        <TimeAgo timestamp={post.date && post.date} />
      </div>
      <p className="post-content">{post.content && post.content}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostsList = () => {
  
  const orderedPostbyId = useSelector(selectPostIds);
  
  
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPost());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") {
    <Spinner />;
  } else if (postStatus === "succeeded") {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));

    content =
      orderedPostbyId &&
      orderedPostbyId.map((post) => (
        <PostExcerpt key={post} postId={post} />
      ));
  } else if (postStatus === "failed") {
    content = <h3>{error}</h3>;
  }
  return (
    <>
      <section className="posts-list">
        <h2>Posts</h2>
        {content}
      </section>
    </>
  );
};
