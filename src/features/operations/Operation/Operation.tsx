import React, { useState } from 'react'
import styles from './styles.module.scss'

interface OperationType {
    id: string,
    date: string,
    concept: string,
    amount: number,
    type: string,
    userEmail: string

}

interface OperationObject {
    operation: OperationType
} 

const Operation: React.FC<OperationObject> = ({operation}) => {

    const [showOperationActions,setShowOperationActions] = useState(false)

    const {concept,amount} = operation
    

    return (
        <>
        <div 
            onClick={() => setShowOperationActions(!showOperationActions)}
            className={`${styles.operationCard}`}>
            
            <span className={`${styles.concept}`}>{concept}</span>
            <span className={`${styles.amount}`}>${amount}</span>
                
        </div>

        </>
    );
}

export default Operation;