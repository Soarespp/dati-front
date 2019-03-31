import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import { connect } from 'react-redux';

class Header extends Component {
    render() {
        return (
            <div className="App">
                <div className="header">
                    <h1>Produtos Dati</h1>
                    <Link className="edit" to="/produtos/novo">Novo</Link>
                    <input
                        type="text"
                        placeholder="Buscar produto"
                        onChange={(e) => {
                            this.props.dispatch({
                                type: "SET_FILTER",
                                filter: e.target.value
                            })
                        }} />
                </div>
            </div>
        )
    }
}

export default connect()(Header);