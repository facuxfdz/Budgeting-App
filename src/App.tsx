import React, {useEffect} from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/components'
import { useAppDispatch } from './app/hooks';
import { OperationsList } from './features/operations';
import AddButtons from './features/operations/AddButtons/AddButtons';
import { userAuthenticated } from './features/users/userSlice'

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

          <Redirect to="/" />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
