import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';


render(
    <Provider store={ store }>
        <App/>
    </Provider>, 
    document.getElementById('root')
)