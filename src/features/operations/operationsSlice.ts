import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '1', date: Date(), concept: 'Some income', amount:200, type: 'income', userEmail: 'facu@facu'},
    {id: '2', date: Date(), concept: 'Some income 2', amount:350, type: 'expense', userEmail: 'facu@facu'},
    {id: '13', date: Date(), concept: 'Some income 3', amount: 540, type: 'income', userEmail: 'facu2@facu'},
    {id: '16', date: Date(), concept: "Some income 4", amount: 233, type: 'income', userEmail: 'facu@facu'},
]

const operationsSlice = createSlice({
    name: 'operationsSlice',
    initialState,
    reducers: {}
})

export default operationsSlice.reducer