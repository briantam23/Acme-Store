import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadInitialOrders } from '../store/actions/orders';
import { loadInitialProducts } from '../store/actions/products';
import { loadInitialUsers } from '../store/actions/users';
import ReactLoading from 'react-loading';
import { HashRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Cart from './Cart';
import Orders from './Orders';
import AlertBanner from './AlertBanner';
import Auth from './Auth';


class App extends Component {
    constructor() {
        super();
        this.state = { loading: true };
    }
    componentDidMount() {
        const { loadInitialOrders, loadInitialProducts, loadInitialUsers, auth } = this.props;
        loadInitialOrders(auth.id)
            .then(() => loadInitialProducts())
            .then(() => loadInitialUsers())
            .then(() => this.setState({ loading: false }))
    }
    render() {
        const { loading } = this.state;
        const { auth } = this.props;
        if(loading) return <ReactLoading type='spokes' color='black'/>
        return(
            <Fragment>
                <h1>Acme Store</h1>
                <Router>
                    <Fragment>
                        <Route render={ ({ location }) => <NavBar pathname={ location.pathname }/> }/>
                        <Route render={ ({ history }) => <Auth history={ history }/> }/> 
                        <Route render={ () => <AlertBanner/> }/>
                        <Route exact path='/' render={ () => <Home/> }/>
                    {
                        auth.id ? (
                            <Fragment>        
                                <Route path='/cart' render={ () => <Cart/> }/>
                                <Route path='/orders' render={ () => <Orders/> }/>
                            </Fragment>
                        ) : null
                    }
                    </Fragment>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = { loadInitialOrders, loadInitialProducts, loadInitialUsers };


export default connect(mapStateToProps, mapDispatchToProps)(App);