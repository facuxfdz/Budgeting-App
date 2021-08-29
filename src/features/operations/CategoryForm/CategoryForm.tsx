import React, { useState } from 'react'
import styles from './styles.module.scss'

export interface IOperationFormProps {
    setShowCategoryForm: React.Dispatch<React.SetStateAction<boolean>>
};

const OperationForm: React.FC<IOperationFormProps> = ({setShowCategoryForm}) => {

    const [category,setCategory] = useState('')
    
    const handleCancel = () => {
        setShowCategoryForm(false)
    }

    const handleSave= (e:React.FormEvent) => {
        e.preventDefault()

        // Save logic
        
        console.log(category)
    }

    
    return (
        <form className={styles.categoryForm}>
            <div className="mb-3 mt-3 text-warning">
                <label htmlFor="category" className="form-label">Category name</label>
                <input 
                    type="text" 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    className="form-control" id="category" 
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
            

        </form>
    );
}

export default OperationForm;