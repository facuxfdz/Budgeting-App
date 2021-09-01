import React, { useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import styles from './styles.module.scss'

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
    operation: OperationType,
    setSelectedOperation: React.Dispatch<React.SetStateAction<OperationType>>
}

const EditForm: React.FC<OperationObject> = ({operation,setSelectedOperation}) => {

    const [concept,setConcept] = useState(operation.concept)
    const [amount,setAmount] = useState(operation.amount)
    const [operationDate,setOperationDate] = useState(operation.date)
    const [category,setCategory] = useState(operation.category)

    const categories = useAppSelector(state => state.categories)

    const handleSave = (e: React.FormEvent) => {
        
    }

    const handleCancel = () => {
        setSelectedOperation({
            id: '',
            date: '',
            concept: '',
            amount: 0,
            type: '',
            category: '',
            userEmail: ''
        })
    }

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
                <option defaultValue="">Select a category</option>
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