import { Operation } from "../../features/operations/operationsSlice"

export const calculateBalanceClass = (incomeOperations: Operation[] ,expenseOperations: Operation[]) => {


    const sum = (a:number,b:number):number => a + b
    const totalIncome = incomeOperations.map(op => op.amount).reduce(sum,0)
    const totalExpense = expenseOperations.map(op => op.amount).reduce(sum,0) 
  
    if(Math.abs(totalExpense/totalIncome) <= 0.25){
        return "alert-success"
    }else if(Math.abs(totalExpense/totalIncome) <= 0.75){
        return "alert-warning"
    }else{
        return "alert-danger"
    }
}