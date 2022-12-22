import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user",
    initialState:{
        value:0
    },
    reducers:{
        ADD:(state,action)=>{
          
           state.value += action.payload
        }
    }
})

export const {ADD} = userSlice.actions;

export default userSlice.reducer;

