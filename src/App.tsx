import React, {useEffect} from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

// Helpers
import { useAppDispatch } from './app/hooks';

// Components
import { Navbar } from './app/components'
import {
  AddButtons, 
  EditForm, 
  OperationForm, 
  OperationsList
} from './features/operations';
import { 
  CategoryForm 
} from './features/categories';

// Actions
import { 
  userAuthenticated 
} from './features/users/userSlice'



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
