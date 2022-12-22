import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddPostForm } from "./Components/AddpostForm";

// import { Navbar } from "./app/Navbar";
import { SinglePostPage } from "./Components/SinglePage";
import { PostsList } from "./Components/PostsList";
import { EditPostForm } from "./Components/EditPostForm";
import Navbar from "./Components/Navbar";
import { UserPage } from "./Components/UserPage";
import UserList from "./Components/UserList"
import { NotificationsList } from "./Components/NotificationList";

function App() {
  // const navigate = useNavigate();
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
        </>
      ),
      children: [
        {
          path: "/",
          element: (
            <>
              <AddPostForm />
              <PostsList />
            </>
          ),
        },
        { path: "/posts/:postId", element: <SinglePostPage /> },
        { path: "/editPost/:postId", element: <EditPostForm /> },
        { path: "/users", element: <UserList /> },
        { path: "/users/:userId", element: <UserPage /> },
        {path:"/notifications", element:<NotificationsList/>}
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
