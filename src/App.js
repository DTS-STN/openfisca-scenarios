import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FormPage from './FormPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/submit'>
          <div>This will be a submit page for displaying results</div>
        </Route>
        <Route path='/'>
          <FormPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
