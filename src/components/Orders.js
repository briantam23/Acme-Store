import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Badge} from 'reactstrap';
import { findProductNameById, findFinishedOrders } from '../util';


const Orders = ({ orders, products, auth }) => (
    <Fragment>
        <h2>Orders</h2>
        <hr/>
    {
        orders.map(order => (
            <ListGroup key={ order.id }>
                <Fragment>Order ID: <br/>{ order.id }</Fragment>
            {
                order.lineItems.map((lineItem, idx) => (
                    <ListGroupItem key={ lineItem.id}>
                        <h5>
                            <Badge color='primary'>{ findProductNameById(products, lineItem.productId) }</Badge>
                            <Badge color='success' style={{ float: 'right' }}>Quantity: { lineItem.quantity }</Badge>
                        </h5>
                    </ListGroupItem>
                ))
            }
            <br/>
            </ListGroup>
        ))
    }   
    </Fragment>
)


const mapStateToProps = ({ orders, products, auth }) => {
    orders = findFinishedOrders(orders, auth.id);
    return { orders, products, auth }
}


export default connect(mapStateToProps)(Orders);