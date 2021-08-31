import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import styles from './styles.module.scss'

import { categoryAdded } from '../categoriesSlice'

export interface IOperationFormProps {
    setShowCategoryForm: React.Dispatch<React.SetStateAction<boolean>>
};

const OperationForm: React.FC<IOperationFormProps> = ({setShowCategoryForm}) => {

    const dispatch = useAppDispatch()

    const [category,setCategory] = useState('')
    
    const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value)
    }
    
    const handleCancel = () => {
        setShowCategoryForm(false)
    }

    const handleSave= (e:React.FormEvent) => {
        e.preventDefault()

        // Save logic
        dispatch(categoryAdded(category))
        alert('category added!')
        setShowCategoryForm(false)
    }

    
    return (
        <form className={styles.categoryForm}>
            <div className="mb-3 mt-3 text-warning">
                <label htmlFor="category" className="form-label">Category name</label>
                <input 
                    type="text" 
                    value={category} 
                    onChange={handleCategory} 
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