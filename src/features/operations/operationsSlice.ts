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
            const id = action.payload
            const existingOperation = state.entities[id]
            if(existingOperation){
                const oldAmount = existingOperation.amount
                operationsAdapter.removeOne(state,id)
                state.balance -= oldAmount
            }
        },
        operationUpdated: (state,action: PayloadAction<UpdatedOperationData>) => {
            const {id,concept,amount,date,category} = action.payload
            
            const existingOperation = state.entities[id]
            
            let oldAmount
            let newAmount

            if(existingOperation){
                if(existingOperation.type === 'expense'){
                    newAmount = -amount
                }else{
                    newAmount = amount
                }
                
                oldAmount = existingOperation.amount

                state.balance = state.balance - oldAmount + newAmount
                existingOperation.concept = concept
                existingOperation.amount = newAmount
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

export const selectUserBalance = createSelector(
    [(state:RootState) => state.operations.balance],
    (balance) => balance
)

export default operationsSlice.reducer