import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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

const {
    selectIds, 
    selectEntities,
} = userAdapter.getSelectors<RootState>(state => state.user)

export const selectCurrentUserEmail = createSelector(
    [selectIds,(state:RootState) => selectEntities(state)],
    (ids,selectedUser) =>  selectedUser[`${ids}`]?.email || ""
)


export default userSlice.reducer