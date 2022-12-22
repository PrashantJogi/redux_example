import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

// import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
   
    const response = await axios("https://gorest.co.in/public/v2/todos");
    // const response = await client.get(
    //   `/fakeApi/notifications?since=${latestTimestamp}`
    // );
    
    return response.data;
  }
);


const notificationAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.due_on.localeCompare(b.due_on),
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    allNotificationRead(state, action) {
      Object.values(state.entities).forEach((state) => {
        state.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationAdapter.upsertMany(state,action.payload)

      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read;
      });

      
    });
  },
});

export default notificationsSlice.reducer;

// export const selectAllNotifications = (state) => state.notifications;

export const { allNotificationRead } = notificationsSlice.actions;

export const { selectAll: selectAllNotifications } = notificationAdapter.getSelectors(
  (state) => state.notifications
);