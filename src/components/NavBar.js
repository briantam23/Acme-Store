import React, { Fragment } from 'react';
import { Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selected, findFinishedOrders, findPendingOrder, findCartCount } from '../util';
import classnames from 'classnames';


const NavBar = ({ orderCount, cartCount, pathname }) => (
    <Fragment>
        <Nav tabs>
            <NavItem>
                <NavLink tag={ Link } to='/' className={ classnames({ active: selected('/', pathname) }) }>
                    Home
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={ Link } to='/cart' className={ classnames({ active: selected('/cart', pathname, true) }) }>
                    Cart <Badge>{ cartCount }</Badge>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={ Link } to='/orders' className={ classnames({ active: selected('/orders', pathname, true) }) }>
                    Orders <Badge>{ orderCount }</Badge>
                </NavLink>
            </NavItem>
        </Nav>
    </Fragment>
)


const mapStateToProps = ({ orders }, { pathname }) => {
    const orderCount = findFinishedOrders(orders).length;
    const cartOrder = findPendingOrder(orders);
    const cartCount = findCartCount(cartOrder);
    return { orderCount, cartCount, pathname };
}


export default connect(mapStateToProps)(NavBar);