import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import NavbarHeader from './components/Navbar';
import {connect} from 'react-redux';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const Routes = (props) => {
    return (
        <BrowserRouter history={history}>
            <NavbarHeader />
            <Route exact path="/" component={!!props.auth.uid ? Dashboard : Login} />
            <Route path="/dashboard" component={Dashboard} />
        </BrowserRouter>
    )
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps, null)(Routes)
