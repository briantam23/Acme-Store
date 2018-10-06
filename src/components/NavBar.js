import React, { Fragment } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { selected } from '../util';
import classnames from 'classnames';


const NavBar = ({ pathname }) => (
    <Fragment>
        <Nav tabs>
            <NavItem>
                <NavLink tag={ Link } to='/' className={ classnames({ active: selected('/', pathname) }) }>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={ Link } to='/cart' className={ classnames({ active: selected('/cart', pathname, true) }) }>Cart</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={ Link } to='/orders' className={ classnames({ active: selected('/orders', pathname, true) }) }>Orders</NavLink>
            </NavItem>
        </Nav>
    </Fragment>
)


export default NavBar;