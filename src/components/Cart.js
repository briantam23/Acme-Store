import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Alert } from 'reactstrap';


class Cart extends Component {
    constructor() {
        super();
        this.state = {
            macBookAir: 0,
            iPhone8: 0,
            hershelBackpack: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(product, change) {
        if(change === 'increase') this.setState({ [product.name]: this.state[product.name] + 1 });
        else {
            if(this.state[product.name] > 0) this.setState({ [product.name]: this.state[product.name] - 1 });
        }
    }
    render() {
        const { macBookAir, iPhone8, hershelBackpack } = this.state;
        const { cart, products } = this.props;
        const { handleChange } = this;
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
                    cart.lineItems.map(lineItem => ( 
                        <tr key={ lineItem.productId }>
                            <td>{ lineItem.productId }</td>
                            <td>{ lineItem.quantity }</td>
                            <td onClick={ () => handleChange(product, 'increase') }><Button>+</Button></td>
                            <td onClick={ () => handleChange(product, 'decrease') }><Button>-</Button></td>
                        </tr>
                    ))
                }
                </tbody>
                </Table>
                <Button color='primary' block>Create Order</Button>
                <Button color='warning' block>Reset</Button>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ orders, products }) => {
    let cart = orders.find(order => order.status === 'CART');
    return { cart, products };
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);