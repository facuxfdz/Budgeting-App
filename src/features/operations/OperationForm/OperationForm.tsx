import React, { useState } from 'react'
import styles from './styles.module.scss'

export interface IOperationFormProps {
    setShowOperationForm: React.Dispatch<React.SetStateAction<boolean>>
};

const OperationForm: React.FC<IOperationFormProps> = ({setShowOperationForm}) => {


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
    
    // Handle functions
    const handleCancel = () => {
        setShowOperationForm(false)
        setConcept('')
        setAmount(0)
        setOperationDate('')
        setOperationType('')
    }

    const handleIncomeCheck = () => {
        setTypeChecked(!typeChecked)
        setOperationType('income')
    }
    
    const handleExpenseCheck = () => {
        setTypeChecked(!typeChecked)
        setOperationType('expense')
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()

        const operation = {
            concept,
            amount,
            date: operationDate,
            type: operationType
        }

        console.log(operation)
        
        // Save logic
    }

    return (
        <form className={styles.operationForm}>

        {!typeChecked 
        
        ?
            (
            <>
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
            </>
            )
            : null
        }       

        {typeChecked 
            ?
            (          
            
            <>

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


            <button 
                type="submit" 
                className="btn btn-warning me-4"
                onClick={handleSave}
            >Save</button>
            
            <button 
                className="btn btn-danger"
                onClick={handleCancel}    
            >Cancel</button>     
            </>
            )   

            : null
        }
        </form>
    );
}

export default OperationForm;