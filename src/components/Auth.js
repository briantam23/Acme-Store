import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { login, logout } from '../store/actions/auth';
import { loadInitialOrders } from '../store/actions/orders';


class Auth extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidUpdate(prevProps) {
        const { auth, loadInitialOrders } = this.props;
        if(prevProps !== this.props) {
            if(auth.id) {
                loadInitialOrders(auth.id)
                    .then(() => this.setState({ name: '', password: '', error: '' }))
            }
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { name, password, error } = this.state;
        const { handleChange } = this;
        const { login, history, logout, auth } = this.props;
        return(
            !auth.id ? (
                <Fragment>
                    <br/>
                    <form style={{ float: 'right' }} >
                        <input onChange={ handleChange } value={ name } name='name' placeholder='Name' autoFocus />
                        <input onChange={ handleChange } value={ password } name='password' placeholder='Password' />
                        <Button onClick={ () => login(this.state, history)
                            .catch(() => this.setState({ error: 'Incorrect Username and/or Password. Please try again.' })) } 
                            color='primary' >Login</Button>
                    </form>
                    <br/>
                {
                    error ? (
                        <Fragment>
                            <br/>
                            <div className='error-message' >{ error }</div> 
                        </Fragment>
                    ) : null
                }
                </Fragment>
            ) : (<Fragment>
                    <br/>
                    <Button onClick={ () => logout(history) } color='danger' style={{ float: 'right' }} >Logout</Button>
                    <h3 style={{ display: 'inline-block', float: 'right' }} >Welcome { auth.name }!&emsp;</h3>
                    <br/>
                </Fragment>
            )
        )
    }
}

const mapStateToProps = ({ auth }, { history }) => ({ history, auth });

const mapDispatchToProps = ({ login, logout, loadInitialOrders });


export default connect(mapStateToProps, mapDispatchToProps)(Auth);