// Libraries
import React, { useState } from 'react'

// Hooks
import { useAppSelector } from '../../../app/hooks'

// Selector functions
import { 
    selectOperationByType, 
    selectOperationByUser, 
    selectUserBalance
} from  '../operationsSlice'
import { 
    selectCurrentUserEmail 
} from '../../users/userSlice'

// Helper functions
import { calculateBalanceClass } from '../../../app/helpers'

// Components
import { Operation } from '../'

interface Props {
    DATALIMIT: number
}

const OperationsList: React.FC<Props> = ({DATALIMIT}) => {
    
    // Local state
    const [currentPage,setCurrentPage] = useState(1)
    
    // Select data from global state
    const userEmail = useAppSelector(state => selectCurrentUserEmail(state))
    const userOperations = useAppSelector(state => selectOperationByUser(state,userEmail))
    const userBalance = useAppSelector(state => selectUserBalance(state))
    const incomeOperations = useAppSelector(state => selectOperationByType(state,'income'))
    const expenseOperations = useAppSelector(state => selectOperationByType(state,'expense'))
    
    // Calculate values
    let balanceStatusClass = calculateBalanceClass(incomeOperations,expenseOperations)
    const pages = Math.ceil(userOperations.length / DATALIMIT)

    // Pagination functions
    const goToNextPage = () => {
        setCurrentPage(page => page + 1)
    }

    const goToPreviousPage = () => {
        setCurrentPage(page => page - 1)
    }
    
    const getPaginatedData = () => {
        const startIndex = currentPage * DATALIMIT - DATALIMIT
        const endIndex = startIndex + DATALIMIT
        return userOperations.slice(startIndex, endIndex)
    }


    return (    
        <section className="container w-75 mt-5">
            {userBalance
                ?   <div className={`alert ${balanceStatusClass} p-2 text-center`}>
                        <h4 className="alert-heading">Balance</h4>
                        <span>{userBalance}</span>
                    </div>
                : null
            }

            {userOperations.length > 0
                ? 
                (
                    <>
                        {getPaginatedData().map(operation => (
                            <Operation 
                                key={operation.id}
                                operation={operation}
                            />
                        ))}

                        <div className="text-center p-3">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="me-2 btn btn-secondary"
                        >prev</button>

                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === pages}
                            className="ms-2 btn btn-secondary"
                        >next</button>
                        </div>

                    </>
                )
                : null
            }

        </section>
    );
}

export default OperationsList;