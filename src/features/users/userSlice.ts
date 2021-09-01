import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

interface User {
    email: string,
    password: string
}

const userAdapter = createEntityAdapter<User>({
    selectId: user => user.email
})


const userSlice = createSlice({
    name: 'user',
    initialState: userAdapter.getInitialState(),
    reducers: {
        userAuthenticated: (state,action) => {
            userAdapter.setOne(state,action.payload)
        }
    }
        
})

export const {userAuthenticated} = userSlice.actions

export default userSlice.reducer