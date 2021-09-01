import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Operation {
    id: string,
    date: string,
    concept: string,
    amount: number,
    type: string,
    category: string,
    userEmail: string,

}

const operationsAdapter = createEntityAdapter<Operation>({
    selectId: operation => operation.id
})


const operationsSlice = createSlice({
    name: 'operationsSlice',
    initialState: operationsAdapter.getInitialState(),
    reducers: {
        operationAdded: operationsAdapter.addOne,
        operationDeleted: (state, action: PayloadAction<string>) => {
            operationsAdapter.removeOne(state,action.payload)
        }
    }
})

export const {
    operationAdded,
    operationDeleted
} = operationsSlice.actions


const {
    selectAll: selectAllOperations
} = operationsAdapter.getSelectors<RootState>(state => state.operations)

export const selectOperationByUser = createSelector(
    [selectAllOperations, (state:RootState,email:string) => email],
    (operations,userEmail) => operations.filter(operation => operation.userEmail === userEmail)
)


export default operationsSlice.reducer