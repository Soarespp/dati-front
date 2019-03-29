import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './components/App';
import Produto from './components/Produto';

import './index.scss';

render(
    <Router >
        <Route exact path="/" component={App} />
        <Route exact path="/produtos/:id" component={Produto} />
    </Router>,
    document.getElementById('root')
);

