import React, { useState } from 'react'
import styles from './styles.module.scss'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch } from '../../../app/hooks'

import {operationDeleted} from '../operationsSlice'

interface OperationType {
    id: string,
    date: string,
    concept: string,
    amount: number,
    type: string,
    category: string,
    userEmail: string

}

interface OperationObject {
    operation: OperationType
} 

const Operation: React.FC<OperationObject> = ({operation}) => {

    const dispatch = useAppDispatch() 

    const [showOperationActions,setShowOperationActions] = useState(false)

    const {id, concept,amount} = operation
    
    const handleDelete = () => {
        dispatch( operationDeleted(id) )
        setShowOperationActions(false)
    }

    const handleEdit = () => {
        setShowOperationActions(false)
    }

    const handleHide = () => {
        setShowOperationActions(false)
    }

    const handleShowOperationActions = () => {
        setShowOperationActions(true)
    }

    return (
        <>
        <div 
            onClick={handleShowOperationActions}
            className={`${styles.operationCard}`}>
            
            <span className={`${styles.concept}`}>{concept}</span>
            <span className={`${styles.amount}`}>${amount}</span>
                
        </div>
        
        <Modal
            size="sm"
            show={showOperationActions}
            onHide={handleHide}
            aria-labelledby="operation-options"
            centered
        >
            <Modal.Header>
                <Modal.Title id="operation-options">
                    Options
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>What do you want to do?</Modal.Body>

            <Modal.Footer>
                <button 
                    className="btn btn-danger" 
                    onClick={handleDelete}
                >Delete</button>

                <button
                    className="btn btn-warning"
                    onClick={handleEdit}
                >Edit</button>
            </Modal.Footer>
        </Modal>

        </>
    );
}

export default Operation;