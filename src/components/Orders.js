import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Badge} from 'reactstrap';
import { findProductNameById, findFinishedOrders } from '../util';


const Orders = ({ orders, products, resetOrders }) => (
    <Fragment>
        <h2>Orders</h2>
        <hr/>
    {
        orders.map(order => (
            <ListGroup key={ order.id }>
                <Fragment>{ order.id }</Fragment>
            {
                order.lineItems.map((lineItem, idx) => (
                    <ListGroupItem key={ lineItem.id}>
                        <Fragment><Badge color='primary'>{ findProductNameById(products, lineItem.productId) }</Badge>
                            <Badge color='success' style={{ float: 'right' }}>Quantity: { lineItem.quantity }</Badge>
                        </Fragment>
                    </ListGroupItem>
                ))
            }
            <br/>
            </ListGroup>
        ))
    }   
    </Fragment>
)


const mapStateToProps = ({ orders, products }) => {
    orders = findFinishedOrders(orders);
    return { orders, products }
}


export default connect(mapStateToProps)(Orders);