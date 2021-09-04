// Libraries
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

// Hooks
import { useAppDispatch } from '../../../app/hooks'

// Action Creators
import {
    operationDeleted,
} from '../operationsSlice'

// Type imports
import type { OperationType } from '../'

// Styles
import styles from './styles.module.scss'


interface OperationObject {
    operation: OperationType
} 

const Operation: React.FC<OperationObject> = ({operation}) => {

    const dispatch = useAppDispatch() 

    // Local state
    const [showOperationActions,setShowOperationActions] = useState(false)

    // Data extract
    const {id, concept,amount, date} = operation
    
    // Handle functions
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