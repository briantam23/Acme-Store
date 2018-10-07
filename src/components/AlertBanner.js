import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Alert, Button } from 'reactstrap';
import { findFinishedOrders, findOrderedCount } from '../util';
import { resetOrders } from '../store/actions/orders';


const AlertBanner = ({ orderedCount }) => (
    <Fragment>
        <br/>
        <Alert color='success'>{ orderedCount } Items Sold!!</Alert>
        <br/>
        <Button color='warning' block disabled>Reset</Button>
        <br/>
    </Fragment>
)


const mapStateToProps = ({ orders }) => {
    const finishedOrders = findFinishedOrders(orders);
    const orderedCount = findOrderedCount(finishedOrders);
    return { orderedCount };
}
const mapDispatchToProps = ({ resetOrders });


export default connect(mapStateToProps, mapDispatchToProps)(AlertBanner);