import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
class SideBar extends Component {
    render() {
        const navOptions = ['Dashboard',
            'Products',
            'Categories',
            'Users']
        return (
            <div>
                {
                navOptions.map(navItem => <NavLink to="/">{navItem}</NavLink>)
            }
            </div>
        )
    }
}

export default SideBar
