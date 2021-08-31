import React from 'react'
import { useAppSelector } from '../../../app/hooks';
import { Operation } from '../'

const OperationsList: React.FC = () => {

    const user = useAppSelector(state => state.user)
    const userOperations = useAppSelector(state => state.operations.filter(operation => operation.userEmail === Object.values(user)[0]))
    
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