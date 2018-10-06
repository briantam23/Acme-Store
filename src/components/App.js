import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadInitialOrders, loadInitialProducts } from '../store/actions/products';
import ReactLoading from 'react-loading';

class App extends Component {
    constructor() {
        super();
        this.state = { loading: true };
    }
    componentDidMount() {
        const { loadInitialOrders, loadInitialProducts } = this.props;
        loadInitialOrders()
            .then(() => loadInitialProducts())
            .then(() => this.setState({ loading: false }))
    }
    render() {
        if(this.state.loading) return <ReactLoading type='spokes' color='black'/>
        return(
            <Fragment>
                <hr/>
                <h1>{ this.props.products.length }</h1>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ orders, products }) => ({
    orders, products
})
const mapDispatchToProps = { loadInitialOrders, loadInitialProducts };


export default connect(mapStateToProps, mapDispatchToProps)(App);