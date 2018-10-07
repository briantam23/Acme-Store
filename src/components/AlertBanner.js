import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { findFinishedOrders, findOrderedCount } from '../util';


const AlertBanner = ({ orderedCount }) => (
    <Fragment>
        <br/>
        <Alert color='success'>{ orderedCount } Items Sold!!</Alert>
    </Fragment>
)

const mapStateToProps = ({ orders }) => {
    const finishedOrders = findFinishedOrders(orders);
    const orderedCount = findOrderedCount(finishedOrders);
    return { orderedCount };
}


export default connect(mapStateToProps)(AlertBanner);