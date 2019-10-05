import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" render={()=>!!sessionStorage.getItem("_sessionToken") ? <Dashboard /> : <Login />} />
            <Route path="/dashboard" component={Dashboard} />
        </BrowserRouter>
    )
}

export default Routes
