import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Outlet } from "react-router-dom";
import { fetchNotifications, selectAllNotifications } from "../Slice/notificationSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(selectAllNotifications);

  const numUnreadNotifications = notifications.filter((n) => !n.read).length;

  let unreadNotificationsBadge;
  if (unreadNotificationsBadge > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    );
  }
  const fetchNewNotifications = () => {
    
    dispatch(fetchNotifications());
  };

  return (
    <>
      <nav>
        <section>
          <h1>Redux Essentials Example</h1>

          <div className="navContent">
            <div className="navLinks">
              <Link to="/">Posts</Link>
              <Link to="/users">Users</Link>
              <Link to="/notifications">
                Notifications {unreadNotificationsBadge}
              </Link>
            </div>
            <button className="button" onClick={() => fetchNewNotifications()}>
              Refresh Notifications
            </button>
          </div>
        </section>
      </nav>
      <div className="App">
        <Outlet />
      </div>
    </>
  );
};
export default Navbar;
