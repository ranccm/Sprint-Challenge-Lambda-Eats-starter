import React from "react";
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import OrderForm from './components/OrderForm'

const App = () => {
  return (
    <div className="App">

      <Route exact path="/">
        <HomePage />
      </Route>

      <Route path="/pizza">
        <OrderForm />
      </Route>

    </div>
    );
};
export default App;
