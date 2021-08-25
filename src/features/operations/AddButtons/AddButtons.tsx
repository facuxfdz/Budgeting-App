import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { plusIcon } from '../../../app/icons'


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