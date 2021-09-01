import React from 'react'
import { useAppSelector } from '../../../app/hooks';
import { Operation } from '../'
import {selectOperationByUser} from  '../operationsSlice'

const OperationsList: React.FC = () => {

    const user = useAppSelector(state => state.user)
    const userEmail = String(Object.values(user)[0])

    const userOperations = useAppSelector(state => selectOperationByUser(state,userEmail))
    
    return (    
        <section className="container w-75 mt-5">
          
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