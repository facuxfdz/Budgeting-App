import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import styles from './styles.module.scss'
import {nanoid} from '@reduxjs/toolkit'

import { categoryAdded } from '../categoriesSlice'
import { selectCurrentUserEmail } from '../../users/userSlice'
import { useHistory } from 'react-router'



const OperationForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const history = useHistory()

    const userEmail = useAppSelector(state => selectCurrentUserEmail(state))
    const [category,setCategory] = useState('')
    
    const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value)
    }
    
    const handleCancel = () => {
        history.push('/')
    }

    const handleSave= (e:React.FormEvent) => {
        e.preventDefault()

        // Save logic
        dispatch(categoryAdded({id: nanoid(),name: category, userEmail}))
        history.push('/')
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