import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Operation {
    id: string,
    date: string,
    concept: string,
    amount: number,
    type: string,
    category: string,
    userEmail: string,

}
const initialState:Operation[] = []

const operationsSlice = createSlice({
    name: 'operationsSlice',
    initialState,
    reducers: {
        operationAdded: (state, action: PayloadAction<Operation>) => {
            state.push(action.payload)
        },
        operationDeleted: (state, action: PayloadAction<string>) => {
            return state.filter(operation => operation.id !== action.payload)
        }
    }
})

export const {
    operationAdded,
    operationDeleted
} = operationsSlice.actions

export default operationsSlice.reducer