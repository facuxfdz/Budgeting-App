import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    email: string,
    password: string
}

const initialState = {}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAuthenticated: (state,action: PayloadAction<User>) => {
            return action.payload
        }
    }
        
})

export const {userAuthenticated} = userSlice.actions

export default userSlice.reducer