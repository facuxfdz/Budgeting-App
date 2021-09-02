import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { plusIcon } from '../../../app/icons'

import {
    selectCategoriesByUser
} from '../../categories/categoriesSlice'

import { OperationForm } from '../'
import { CategoryForm } from '../../categories'
import { useAppSelector } from '../../../app/hooks'
import { selectCurrentUserEmail } from '../../users/userSlice'


const AddButtons: React.FC = () => {
    
    // Local state
    const [showOptions,setShowOptions] = useState(false)
    const [showOperationForm,setShowOperationForm] = useState(false)
    const [showCategoryForm,setShowCategoryForm] = useState(false)
    
    // Global selector logic
    const userEmail = useAppSelector(state => selectCurrentUserEmail(state))
    const categories = useAppSelector(state => selectCategoriesByUser(state,userEmail))
    
    
    const enableAddOptions = () => {
        setShowOperationForm(false)
        setShowCategoryForm(false)
        setShowOptions(!showOptions);
    }

    const handleOperation = () => {
        setShowOptions(false)
        setShowOperationForm(true)

    }

    const handleCategory = () => {
        setShowOptions(false)
        setShowCategoryForm(true)        
    }


    // Rendering logic
    const canOpenOperations = categories.length !== 0

    const props = useSpring({
        opacity: showOptions ? 1 : 0,
        marginTop: showOptions ? 0 : -10,
        delay: 95
    })
  
    
    return (
        <section className="container">

            <div className="row text-center">
                
                <div className="col text-center mt-5">
                    <button 
                        type="button" 
                        className="btn button-outline-primary"
                        onClick={enableAddOptions}
                    >{plusIcon} <span className="align-middle">Add New</span></button>
                </div>
            </div>
            <div className="row text-center">
                <animated.div style={{...props}}>
                {showOptions 
                    ? (
                        <>
                        
                            
                            <button 
                                type="button" 
                                className="btn button-outline-secondary mt-3 me-2"
                                onClick={handleOperation}
                                disabled={!canOpenOperations}
                            >Operation</button>
                                                    
                            
                            <button 
                                type="button" 
                                className="btn button-outline-secondary mt-3 ms-2"
                                onClick={handleCategory}
                            >Category</button>

                        </>
                    )
                    
                    : null
                }                
                </animated.div>

                {showOperationForm
                
                ? <OperationForm 
                    setShowOperationForm={setShowOperationForm}
                />   

                : null
                }

                {showCategoryForm
                
                ?   <CategoryForm 
                        setShowCategoryForm={setShowCategoryForm}
                    />   

                : null
                }
                 
            
            </div>
        
        </section>
    );
}



export default AddButtons;