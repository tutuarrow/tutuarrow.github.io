import React from "react";
import { Router, Route } from "react-router";
import { createBrowserHistory } from 'history';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

const history = new createBrowserHistory();

function App() {
  return (
    <Router history = {history}>
      <Route path="/" exact component={Dashboard} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  );
}

export default App;
