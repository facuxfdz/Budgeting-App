import React, {useEffect} from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/components'
import { useAppDispatch } from './app/hooks';
import { OperationForm, OperationsList } from './features/operations';
import AddButtons from './features/operations/AddButtons/AddButtons';
import { EditForm } from './features/operations'
import { userAuthenticated } from './features/users/userSlice'
import { CategoryForm } from './features/categories';



function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userAuthenticated({email: 'facu@facu',password:'comostas'}))
    //eslint-disable-next-line
  },[])

  return (
    <Router>

      <div className="App">

        <Navbar />
        <Switch>
          <Route 
            exact
            path="/"
            render={() => (
              <>
                <AddButtons />
                <OperationsList />
              </>
            )}
          />
          <Route exact path="/editOperation/:operationId" component={EditForm} />
          <Route exact path="/newCategory" component={CategoryForm} />
          <Route exact path="/newOperation" component={OperationForm} />
          <Redirect to="/" />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
