import React from 'react';
import logo from './logo.svg';
import Login from './Login';
import Budget from './Budget';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
 return (
   <div className="App">
     <header className="App-header">
       <Switch>
         <Route exact path="/" component={Login}></Route>
         <Route path="/budget" component={Budget}></Route>
       </Switch>
     </header>
   </div>
 );
}
export default App;