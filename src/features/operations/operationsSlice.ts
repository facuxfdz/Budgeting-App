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
        balance: 0
    }),
    reducers: {
        operationAdded: (state,action: PayloadAction<Operation>) => {
            const { amount, type } = action.payload            
            let newAmount
            if(type === 'expense'){
                newAmount = -amount
            }else{
                newAmount = amount
            }

            const newOperation = {...action.payload,amount:newAmount}
            
            operationsAdapter.addOne(state,newOperation)
            state.balance += newOperation.amount
            
        },
        operationDeleted: (state, action: PayloadAction<string>) => {
            operationsAdapter.removeOne(state,action.payload)
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

    }
})

export const {
    operationAdded,
    operationDeleted,
    operationUpdated,
} = operationsSlice.actions


export const {
    selectAll: selectAllOperations,
    selectById: selectOperationById
} = operationsAdapter.getSelectors<RootState>(state => state.operations)

export const selectOperationByUser = createSelector(
    [selectAllOperations, (state:RootState,email:string) => email],
    (operations,userEmail) => operations.filter(operation => operation.userEmail === userEmail)
)


export default operationsSlice.reducer