import React from 'react'
import { useAppSelector } from '../../../app/hooks';
import { Operation } from '../'
import { selectOperationByType, selectOperationByUser, selectUserBalance} from  '../operationsSlice'
import { selectCurrentUserEmail } from '../../users/userSlice';
import { calculateBalanceClass } from '../../../app/helpers'

const OperationsList: React.FC = () => {

    const userEmail = useAppSelector(state => selectCurrentUserEmail(state))
    const userOperations = useAppSelector(state => selectOperationByUser(state,userEmail))
    const userBalance = useAppSelector(state => selectUserBalance(state))
   
    const incomeOperations = useAppSelector(state => selectOperationByType(state,'income'))
    const expenseOperations = useAppSelector(state => selectOperationByType(state,'expense'))
    
    let balanceStatusClass = calculateBalanceClass(incomeOperations,expenseOperations)
  

    return (    
        <section className="container w-75 mt-5">
            {userBalance
                ?   <div className={`alert ${balanceStatusClass} p-2 text-center`}>
                        <h4 className="alert-heading">Balance</h4>
                        <span>{userBalance}</span>
                    </div>
                : null
            }
                {userOperations.map(operation => (
                    <Operation 
                        key={operation.id}
                        operation={operation}
                    />
                ))}
        </section>
    );
}

export default OperationsList;