import React, { Component } from 'react'
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap'
import {connect} from 'react-redux';
import {logoutRequest} from './../../actions';

class NavbarHeader extends Component {
    handleLogout = () => {
        sessionStorage.removeItem("_sessionToken");
        this.props.logoutRequest();
    }
    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler />
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={this.handleLogout}>Logout</NavLink>
                        </NavItem>
                        
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    logoutRequest:()=>dispatch(logoutRequest())
})

export default connect(null,mapDispatchToProps)(NavbarHeader)
