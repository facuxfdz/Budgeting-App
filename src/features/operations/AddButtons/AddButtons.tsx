import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'



const AddButtons: React.FC = () => {
    
    const [showOptions,setShowOptions] = useState(false)
    const props = useSpring({ 
        opacity: showOptions ? 1 : 0,
        marginTop: showOptions ? 0 : -10,
        delay: 95
    })
    const enableAddOptions = () => {
        setShowOptions(!showOptions);
    }
  
    const plusIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle me-1" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>

  
    
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
                {showOptions 
                    ? (
                        <>
                        <animated.div style={{...props}}>
                            
                            <button 
                                type="button" 
                                className="btn button-outline-secondary mt-3 me-2"
                            >Operation</button>
                                                    
                            
                            <button 
                                type="button" 
                                className="btn button-outline-secondary mt-3 ms-2"
                            >Category</button>
                           
                       
                        </animated.div>

                        </>
                    )
                    
                    : null
                }
            </div>
        
        </section>
    );
}



export default AddButtons;