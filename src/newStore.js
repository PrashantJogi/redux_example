import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Demo/userSlice";

 const newStore = configureStore({
    reducer:{
        user:userSlice
    }
})

export default newStore;