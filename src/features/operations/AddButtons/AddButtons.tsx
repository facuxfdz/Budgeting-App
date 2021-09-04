// Libraries
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'

// Hooks
import { useAppSelector } from '../../../app/hooks'

// Helper files
import { plusIcon } from '../../../app/icons'

// Selector functions
import {
    selectCategoriesByUser
} from '../../categories/categoriesSlice'
import { 
    selectCurrentUserEmail 
} from '../../users/userSlice'


const AddButtons: React.FC = () => {
    
    // Local state
    const [showOptions,setShowOptions] = useState(false)
    
    // Select data from global state
    const userEmail = useAppSelector(state => selectCurrentUserEmail(state))
    const categories = useAppSelector(state => selectCategoriesByUser(state,userEmail))
    
    
    
    // Rendering logic
    const enableAddOptions = () => {
        setShowOptions(!showOptions);
    }

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
                        
                            {canOpenOperations
                                ?
                                    <Link 
                                        to='/newOperation'
                                        className="btn button-outline-secondary mt-4 me-3"
                                    >Operation</Link>
                                : null
                            }                       
                            
                            <Link 
                                to='/newCategory'
                                className="btn button-outline-secondary mt-4"
                            >Category</Link>

                        </>
                    )
                    
                    : null
                }                
                </animated.div>


                 
            
            </div>
        
        </section>
    );
}



export default AddButtons;