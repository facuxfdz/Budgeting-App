// Libraries
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { useHistory } from 'react-router-dom'

// Hooks
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

// Selector functions
import {
    selectCategoriesByUser
} from '../../categories/categoriesSlice'
import { 
    selectCurrentUserEmail 
} from '../../users/userSlice'
import { 
    selectOperationById,
    operationUpdated, 
} from '../operationsSlice'

// Type imports
import type { OperationType as Operation } from '..'

// Styles
import styles from './styles.module.scss'

// Types
interface MatchParams {
    operationId: string
}

interface Props extends RouteComponentProps<MatchParams>{}

const EditForm: React.FC<Props> = ({match}) => {

    const history = useHistory()
    const dispatch = useAppDispatch()
    
    // URL Extract logic
    const {operationId} = match.params
    
    // Select data from global state
    const userEmail = useAppSelector(state => selectCurrentUserEmail(state))
    const operation = useAppSelector(state => selectOperationById(state,operationId)) as Operation
    const categories = useAppSelector(state => selectCategoriesByUser(state,userEmail))
    
    // Local state
    const [concept,setConcept] = useState(operation.concept)
    const [amount,setAmount] = useState(Math.abs(operation.amount))
    const [operationDate,setOperationDate] = useState(operation.date)
    const [category,setCategory] = useState(operation.category)
    
    
    // Handle functions
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()

        const newOperation = {
            id: operationId,
            concept,
            amount,
            date: operationDate,
            category,
        }

        if(canSave){
            dispatch(operationUpdated(newOperation))
            history.push('/')
        }else if(amount <= 0){
            alert('Amount must be a valid number')
        }else{
            alert('All fields are required')
        }
        
    }

    const handleCancel = () => {
        history.push('/')
    }

    // Rendering logic
    const canSave = [concept,amount,operationDate,category].every(Boolean) && amount > 0


    return (
        <form className={styles.editForm}>
           <div className="mb-3 mt-3 text-warning">
                <label htmlFor="concept" className="form-label">Concept</label>
                <input 
                    type="text" 
                    value={concept} 
                    onChange={e => setConcept(e.target.value)} 
                    className="form-control" id="concept" 
                />
            </div>
            
            <label htmlFor="amount" className="text-warning form-label">Amount</label>
            <div className="mb-3 input-group">
                <span className="input-group-text">$</span>
                <input 
                    type="number" 
                    value={`${amount}`} 
                    onChange={e => setAmount(Number(e.target.value) || 0)} 
                    className="form-control" id="amount" 
                />
            </div>

            <div className="mb-3 mt-3 text-warning">
                <label htmlFor="date" className="form-label">Date</label>
                <input 
                    type="date" 
                    defaultValue={operationDate} 
                    onChange={e => setOperationDate(e.target.value)}
                    className="form-control" id="date" 
                />
            </div>
            
            <div className="mb-3 mt-3 text-warning">
                <label htmlFor="category" className="form-label">Category</label>
                <select 
                    className="form-select" 
                    aria-label="Default select example"
                    value={category}
                    id="category"
                    onChange={e => setCategory(e.target.value)}
                >
                <option value="">Select a category</option>
                    {categories.map(categ => (
                        <option 
                            key={categ.id}
                            value={categ.name}    
                        >
                            {categ.name}
                        </option>
                    ))}
                </select>
            </div>
            <button 
                type="submit" 
                className="btn btn-warning me-4"
                onClick={handleSave}
            >Save</button>
            
            <button 
                className="btn btn-danger"
                onClick={handleCancel}    
            >Cancel</button>    
        </form>
    );
}

export default EditForm;