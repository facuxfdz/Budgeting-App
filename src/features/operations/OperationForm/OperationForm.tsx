import React, { ChangeEvent, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import styles from './styles.module.scss'
import {nanoid} from '@reduxjs/toolkit'

import {
    operationAdded,
} from '../operationsSlice'

import {
    selectCategoriesByUser,
} from '../../categories/categoriesSlice'
import { useHistory } from 'react-router'


const OperationForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const history = useHistory()

    // Logic to extract the date in the required format for the input
    // By default, the operation will be the same day we are writting it
    let date = new Date().toISOString()
    const dateFormat = /\d\d\d\d-\d\d-\d\d/
    const matchString = date.match(dateFormat)
    date = matchString ? matchString[0] : ''

    // Local state
    const [concept,setConcept] = useState('')
    const [amount,setAmount] = useState(0)
    const [operationDate,setOperationDate] = useState(date)
    const [operationType,setOperationType] = useState('')
    const [typeChecked,setTypeChecked] = useState(false)
    const [category,setCategory] = useState('')

    // Select from global state logic 
    const user = useAppSelector(state => state.user)
    const userEmail = String(Object.values(user)[0])
    const categories = useAppSelector(state => selectCategoriesByUser(state,userEmail))



    // Handle functions
    const handleCancel = () => {    
        history.push('/')
    }

    const handleIncomeCheck = () => {
        setTypeChecked(!typeChecked)
        setOperationType('income')
    }
    
    const handleExpenseCheck = () => {
        setTypeChecked(!typeChecked)
        setOperationType('expense')
    }

    const handleConceptChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConcept(e.target.value)
    }

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value) || 0)
    }
    
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOperationDate(e.target.value)
    }


    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()

        const operation = {
            id: nanoid(),
            concept,
            amount,
            date: operationDate,
            type: operationType,
            category,
            userEmail
        }

        if(canSave){
            dispatch(operationAdded(operation))
            history.push('/')
        }
        else if(amount <= 0){alert('Amount must be a valid value')}
        else alert('All fields required')

    }

    // Conditional logic
    const canSave = [concept,amount,operationDate,operationType,category,userEmail].every(Boolean) && amount > 0

    return (
        <form className={styles.operationForm}>

        {!typeChecked 
        
        ?
            (
            <div className="text-center p-2">
            <label htmlFor="operation-type" className="text-warning mt-2 form-label">What are you going to registry?</label>
            <div id="operation-type" className=" text-warning">

                <input 
                    type="radio" 
                    className="btn-check" 
                    name="options-outlined" 
                    id="success-outlined" 
                    autoComplete="off"
                    onClick={handleIncomeCheck}
                />
                <label className="btn btn-outline-success me-3" htmlFor="success-outlined">Income</label>
                <input 
                    type="radio" 
                    className="btn-check" 
                    name="options-outlined" 
                    id="danger-outlined" 
                    autoComplete="off"
                    onClick={handleExpenseCheck}
                />
                <label className="btn btn-outline-danger" htmlFor="danger-outlined">Expense</label>
            </div>
            </div>
            )
            : (
                <>

                <div className="mb-3 mt-3 text-warning">
                    <label htmlFor="concept" className="form-label">Concept</label>
                    <input 
                        type="text" 
                        value={concept} 
                        onChange={handleConceptChange} 
                        className="form-control" id="concept" 
                    />
                </div>
                
                <label htmlFor="amount" className="text-warning form-label">Amount</label>
                <div className="mb-3 input-group">
                    <span className="input-group-text">$</span>
                    <input 
                        type="number" 
                        value={`${amount}`} 
                        onChange={handleAmountChange} 
                        className="form-control" id="amount" 
                    />
                </div>
    
                <div className="mb-3 mt-3 text-warning">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input 
                        type="date" 
                        defaultValue={operationDate} 
                        onChange={handleDateChange}
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
    
                <div className="mt-3 text-center">
                <button 
                    type="submit" 
                    className="btn btn-warning me-4"
                    onClick={handleSave}
                >Save</button>
                
                <button 
                    className="btn btn-danger"
                    onClick={handleCancel}    
                >Cancel</button>     
                </div>
                </>
            )
        }       

        </form>
    );
}

export default OperationForm;