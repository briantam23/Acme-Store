import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadInitialOrders } from '../store/actions/orders';
import { loadInitialProducts } from '../store/actions/products';
import ReactLoading from 'react-loading';
import { HashRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';


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
                <h1>Acme Store</h1>
                <Router>
                    <Fragment>
                        <Route render={ ({ location }) => <NavBar pathname={ location.pathname }/> }/>
                        <Route exact path='/' render={ () => <Home/> }/>
                        <Route path='/cart' render={ () => <Cart/> }/>
                        <Route path='/orders' render={ () => <Orders/> }/>
                    </Fragment>
                </Router>
            </Fragment>
        )
    }
}

const mapDispatchToProps = { loadInitialOrders, loadInitialProducts };


export default connect(null, mapDispatchToProps)(App);