import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";
import { selectAllUsers, useAddTaskMutation } from "../Slice/userSlice";
import { fetchPost } from "../Slice/postSlice"

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus ,  setAddRequestStatus] = useState("idle"); 

  const dispatch = useDispatch();
  const [addTask] = useAddTaskMutation();

  const submit = async (Obj) => {
    await addTask(Obj);
    dispatch(fetchPost());
  };

  const users = useSelector(selectAllUsers);
  
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  
     const onSavePostClicked = () => {
      if(canSave){
        
      }
       if (title && content) {
        setAddRequestStatus('pending');
         let Obj = {
           title: title,
           body: content,
           user_id: userId,
          //  user: title,
         };
        //  dispatch(sendPost(Obj));
         submit(Obj);
        //  dispatch(fetchPost());
         setTitle("");
         setContent("");
         setAddRequestStatus("pending");
       }
     };
      const canSave =
        Boolean(title) &&
        Boolean(content) &&
        Boolean(userId) &&
        addRequestStatus==="idle";

      const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
          
        </option>
      ));
  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
