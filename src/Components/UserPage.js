import React from "react";
import { useSelector } from "react-redux";
import { Link,  useParams } from "react-router-dom";

import { selectUserById } from "../Slice/userSlice"
import { selectPostsByUser } from "../Slice/postSlice"

export const UserPage = () => {
  const { userId } = useParams();
    
  const user = useSelector((state) => selectUserById(state, userId));

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId));
  
  // const postsForUser = useSelector((state) => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post) => post.user === userId);
  // });

  const postTitles = postsForUser.map((post) => (
   
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    
  ));
   

  return (
    <section>
      <h2>{user && user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};
