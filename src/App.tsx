import React from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/components'

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
                <p>Ola</p>
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
