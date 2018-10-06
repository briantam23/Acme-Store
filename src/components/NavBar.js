import React, { Fragment } from 'react';
import { Nav, NavItem, NavLink, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selected } from '../util';
import classnames from 'classnames';


const NavBar = ({ orders, products, pathname }) => (
    <Fragment>
        <Nav tabs>
            <NavItem>
                <NavLink tag={ Link } to='/' className={ classnames({ active: selected('/', pathname) }) }>
                    Home
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={ Link } to='/cart' className={ classnames({ active: selected('/cart', pathname, true) }) }>
                    Cart <Badge>{ products.length }</Badge>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={ Link } to='/orders' className={ classnames({ active: selected('/orders', pathname, true) }) }>
                    Orders <Badge>{ orders.length }</Badge>
                </NavLink>
            </NavItem>
        </Nav>
    </Fragment>
)

const mapStateToProps = ({ orders, products }, { pathname }) => ({ orders, products, pathname });

export default connect(mapStateToProps)(NavBar);