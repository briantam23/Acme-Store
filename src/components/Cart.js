import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Alert } from 'reactstrap';
import { createLineItem, updateOrder, resetOrders } from '../store/actions/orders';


class Cart extends Component {
    constructor() {
        super();
    }
    render() {
        const { cart, products, createLineItem, updateOrder, resetOrders } = this.props;
        return(
            <Fragment>
                <br/>
                <Alert color='success'>(Number) Items Sold!!</Alert>
                <h1>Cart</h1>
                <hr/>
                <h3>Products</h3>
                <Table dark striped>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity Ordered</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map(product => {
                        let quantity = 0;
                        let inCart = false;
                        let lineItem = null;
                        if(cart.lineItems.find(lineItem => lineItem.productId === product.id)) {
                            lineItem = cart.lineItems.find(lineItem => lineItem.productId === product.id);
                            quantity = lineItem.quantity;
                            inCart = true;
                            console.log(quantity)
                        }
                        console.log(quantity)
                        const orderId = cart.id;
                        return( 
                            <tr key={ product.id }>
                                <td>{ product.name }</td>
                                <td>{ quantity }</td>
                                <td onClick={ () => inCart ? updateOrder(lineItem, orderId, quantity) : createLineItem(product, orderId) }><Button>+</Button></td>
                                <td onClick={ () => handleChange(product, orderId, 'decrease') }><Button>-</Button></td>
                            </tr>
                    )})
                }
                </tbody>
                </Table>
                <Button color='primary' block>Create Order</Button>
                <Button color='warning' block disabled>Reset</Button>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ orders, products }) => {
    let cart = orders.find(order => order.status === 'CART');
    return { cart, products };
}
const mapDispatchToProps = ({ createLineItem, updateOrder, resetOrders });

export default connect(mapStateToProps, mapDispatchToProps)(Cart);