import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import classnames from "classnames";
import { selectAllUsers } from "../Slice/userSlice"

import { allNotificationRead, selectAllNotifications } from "../Slice/notificationSlice"

export const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications);

  const users = useSelector(selectAllUsers);
 
  const dispatch = useDispatch();
    
    useLayoutEffect(() => {
      dispatch(allNotificationRead());
    });
    
  const renderedNotifications =notifications && notifications.map((notification) => {
    const date = parseISO(notification.due_on);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find((user) =>user.id === notification.id)||"Unknown" 
    
     const notificationClassname = classnames("notification", {
       new: notification.isNew,
     });
    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user}</b>
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};
