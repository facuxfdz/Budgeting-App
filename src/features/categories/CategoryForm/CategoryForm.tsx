// Libraries
import React, { ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router'
import {nanoid} from '@reduxjs/toolkit'

// Hooks
import { 
    useAppDispatch, 
    useAppSelector 
} from '../../../app/hooks'

// Select functions
import { 
    selectCurrentUserEmail 
} from '../../users/userSlice'

// Action creators
import { 
    categoryAdded 
} from '../categoriesSlice'

// Styles
import styles from './styles.module.scss'



const OperationForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const history = useHistory()

    // Local state
    const [category,setCategory] = useState('')
    
    // Select data from global state
    const userEmail = useAppSelector(state => selectCurrentUserEmail(state))
    
    // Handle functions
    const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value)
    }
    
    const handleCancel = () => {
        history.push('/')
    }

    const handleSave= (e:React.FormEvent) => {
        e.preventDefault()

        // Save logic
        if(category){
            dispatch(categoryAdded({id: nanoid(),name: category, userEmail}))
            history.push('/')
        }else{
            alert('Category name is required')
        }
    }

    
    return (
        <form className={styles.categoryForm}>
            <div className="mb-3 mt-3 text-warning text-center">
                <label htmlFor="category" className="form-label">Category name</label>
                <input 
                    type="text" 
                    value={category} 
                    onChange={handleCategory} 
                    className="form-control" id="category" 
                />
            </div>

            <div className="mt-4 text-center">
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

        </form>
    );
}

export default OperationForm;