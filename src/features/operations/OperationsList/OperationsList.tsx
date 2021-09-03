import React from 'react'
import { useAppSelector } from '../../../app/hooks';
import { Operation } from '../'
import {selectOperationByUser, selectUserBalance} from  '../operationsSlice'
import { selectCurrentUserEmail } from '../../users/userSlice';

const OperationsList: React.FC = () => {

    const userEmail = useAppSelector(state => selectCurrentUserEmail(state))
    const userOperations = useAppSelector(state => selectOperationByUser(state,userEmail))
    const userBalance = useAppSelector(state => selectUserBalance(state))
    let balanceStatusClass
    if(userBalance >= 1000){
        balanceStatusClass = "alert-success"
    }else if(userBalance >= 500){
        balanceStatusClass = "alert-warning"
    }else{
        balanceStatusClass="alert-danger"
    }

    return (    
        <section className="container w-75 mt-5">
            <div className={`alert ${balanceStatusClass} p-2 text-center`}>
                <h4 className="alert-heading">Balance</h4>
                <span>{userBalance}</span>
            </div>
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