import { 
    createEntityAdapter, 
    createSelector, 
    createSlice, 
    PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Operation {
    id: string,
    date: string,
    concept: string,
    amount: number,
    type: string,
    category: string,
    userEmail: string,

}

interface UpdatedOperationData {
    id: string,
    date: string,
    concept: string,
    amount: number,
    category: string,
}

const operationsAdapter = createEntityAdapter<Operation>({
    selectId: operation => operation.id
})


const operationsSlice = createSlice({
    name: 'operationsSlice',
    initialState: operationsAdapter.getInitialState({
        selectedOperation: {}
    }),
    reducers: {
        operationAdded: operationsAdapter.addOne,
        operationDeleted: (state, action: PayloadAction<string>) => {
            operationsAdapter.removeOne(state,action.payload)
            state.selectedOperation = {}
        },
        operationUpdated: (state,action: PayloadAction<UpdatedOperationData>) => {
            const {id,concept,amount,date,category} = action.payload
            
            const existingOperation = state.entities[id]
            
            if(existingOperation){
                existingOperation.concept = concept
                existingOperation.amount = amount
                existingOperation.date = date
                existingOperation.category = category
            }

        },
        operationSelectedReseted: (state,action) => {
            state.selectedOperation = {}
        }
    }
})

export const {
    operationAdded,
    operationDeleted,
    operationUpdated,
    operationSelectedReseted
} = operationsSlice.actions


export const {
    selectAll: selectAllOperations,
    selectById: selectOperationById
} = operationsAdapter.getSelectors<RootState>(state => state.operations)

export const selectOperationByUser = createSelector(
    [selectAllOperations, (state:RootState,email:string) => email],
    (operations,userEmail) => operations.filter(operation => operation.userEmail === userEmail)
)

export const currentOperation = createSelector(
    [ (state:RootState) => state.operations.selectedOperation ],
    (currentOperation) => currentOperation
)


export default operationsSlice.reducer