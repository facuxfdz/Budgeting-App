import React from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/components'
import AddButtons from './features/operations/AddButtons/AddButtons';

function App() {
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
