import React, { Fragment } from 'react';
import { Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selected, findFinishedOrders, findPendingOrder, findCartCount } from '../util';
import classnames from 'classnames';


const NavBar = ({ orderCount, cartCount, pathname, auth }) => {
    return(
        <Fragment>
            <Nav tabs>
                <NavItem>
                    <NavLink tag={ Link } to='/' className={ classnames({ active: selected('/', pathname) }) }>
                        Home
                    </NavLink>
                </NavItem>
            {
                auth.id ? (
                    <Fragment>
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
                    </Fragment>
                ) : null
            }
            </Nav>
        </Fragment>
    )
}


const mapStateToProps = ({ orders, auth }, { pathname }) => {
    let orderCount = 0;
    let cartOrder = null;
    let cartCount = 0;
    
    orderCount = findFinishedOrders(orders).length;
    cartOrder = findPendingOrder(orders);
    cartCount = findCartCount(cartOrder);

    return { orderCount, cartCount, pathname, auth };
}


export default connect(mapStateToProps)(NavBar);