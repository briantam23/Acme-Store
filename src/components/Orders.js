import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Alert } from 'reactstrap';
import { findProductNameById } from '../util';
import { resetOrders } from '../store/actions/orders';


class Orders extends Component {
    render() {
        const { orders, products, resetOrders } = this.props;
        return(
            <Fragment>
                <br/>
                <Alert color='success'>(Number) Items Sold!!</Alert>
                <h2>Orders</h2>
                <hr/>
                <h3>Orders</h3>
                <Table dark striped>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                {
                    orders.map(order => (
                        order.lineItems.map((lineItem, idx) => (
                            <Fragment key={ lineItem.id}>
                                <tr key={ order.id }>
                                    <td>{ idx < 1 ? order.id : null }</td>
                                    <td>{ findProductNameById(products, lineItem.id) }</td>
                                    <td>{ lineItem.quantity }</td>
                                </tr>
                            </Fragment>
                        ))
                    ))
                }   
                </tbody>
                </Table>
                <Button color='warning' block disabled>Reset</Button>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ orders, products }) => {
    orders = orders.filter(order => order.status === 'ORDER');
    return { orders, products }
}
const mapDispatchToProps = ({ resetOrders })

export default connect(mapStateToProps, mapDispatchToProps)(Orders);