import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import { findFinishedOrders, findOrderedCount } from '../util';
import { resetOrders } from '../store/actions/orders';


const AlertBanner = ({ orderedCount, resetOrders, pathname, auth }) => (
    <Fragment>
    {
        pathname !== '/' && auth.id ? (
            <Fragment>
                <br/>
                <Alert color='success'>{ orderedCount } Items Sold!!</Alert>
                <br/>
                <Button onClick={ () => resetOrders(auth.name) }color='warning'>Reset</Button>
                <br/><br/>
            </Fragment>
        ) : null
    }
    </Fragment>

)


const mapStateToProps = ({ orders, auth }, { pathname }) => {
    const finishedOrders = findFinishedOrders(orders);
    const orderedCount = findOrderedCount(finishedOrders);
    return { orderedCount, pathname, auth };
}
const mapDispatchToProps = ({ resetOrders });


export default connect(mapStateToProps, mapDispatchToProps)(AlertBanner);