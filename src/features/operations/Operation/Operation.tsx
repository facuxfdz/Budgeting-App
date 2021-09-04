import React, { useState } from 'react'
import styles from './styles.module.scss'
import Modal from 'react-bootstrap/Modal'
import { useAppDispatch } from '../../../app/hooks'

import {
    operationDeleted,
} from '../operationsSlice'
import { Link } from 'react-router-dom'

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

    const {id, concept,amount, date} = operation
    
    const handleDelete = () => {
        dispatch( operationDeleted(id) )
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
            
            <div className={`${styles.concept}`}>
                <span>{concept}</span>
                <span className="d-block text-secondary">{date}</span>
            </div>
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

                <Link to={`/editOperation/${operation.id}`} className="btn btn-warning">
                    Edit
                </Link>
            </Modal.Footer>
        </Modal>

        </>
    );
}

export default Operation;