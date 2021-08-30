import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

interface Categories extends Array<Category>{}
interface Category {
    id: string,
    name: string
}

const initialState: Categories = []

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoryAdded: {
            reducer: (state, action: PayloadAction<Category>) => {
                state.push(action.payload)
            },
            prepare: (name:string) => {
                const id = nanoid()
                return {payload: {id,name}}
            },
        }
    }
})

export const {categoryAdded} = categoriesSlice.actions

export default categoriesSlice.reducer