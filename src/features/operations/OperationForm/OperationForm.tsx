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

    
    // Handle functions
    const handleCancel = () => {
        setShowOperationForm(false)
        setConcept('')
        setAmount(0)
        setOperationDate('')
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()

        // Save logic
    }

    return (
        <form className={styles.operationForm}>
        
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
            >Save Operation</button>
            
            <button 
                className="btn btn-danger"
                onClick={handleCancel}    
            >Cancel</button>        
        </form>
    );
}

export default OperationForm;