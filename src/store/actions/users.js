import { LOAD_INITIAL_USERS } from '../constants';
import axios from 'axios';


const _loadInitialUsers = users => ({
    type: LOAD_INITIAL_USERS,
    users
})

export const loadInitialUsers = () => (
    dispatch => (
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => dispatch(_loadInitialUsers(users)))
    )
)