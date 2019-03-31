import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './ProdutoLista.scss';


const mapDispatchToProps = dispatch => ({
    getProducts: () => {
        fetch("http://18.228.14.48/api/products?cmd=list")
            .then((response) => response.json())
            .then((products) => {
                console.log("products")
                dispatch({
                    type: 'SET_PRODUCTS',
                    products
                })
            })
            .catch(() => {
                dispatch({
                    TYPE: 'SET_PRODUCTS',
                    products: []
                })
            })
    }
});

const mapStateToProps = state => ({
    products: state.products,
    filter: state.filter,
    isGetting: false,
    hasGetError: false
})

class ProdutoLista extends Component {
    deleteProduct(id) {

        fetch(`http://18.228.14.48/api/products/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                this.props.getProducts()
            })
    }

    componentDidMount() {
        console.log("passou")
        this.props.getProducts()
    }

    render() {
        const regex = new RegExp(`^(.*)${this.props.filter}(.*)$`, "ig")

        return (

            <div className="container">
                {(() => {
                    if (this.props.isGetting) {
                        return <p>Carregando...</p>
                    } else if (this.props.hasGetError) {
                        return <p>Nao foi possivel buscar os produtos</p>
                    } else if (!this.props.products.length) {
                        return <p>Nao foi encontrado nenhum produto</p>
                    } else {
                        return (
                            <ul className="products">
                                {this.props.products.filter((product) => product.description.match(regex)).map((product) => (
                                    <li className="product" key={product.code}>
                                        <p className="text">{product.code} - {product.description}</p>
                                        <Link className="edit" to={`/produtos/${product.id}`}>Editar</Link>
                                        <button className="delete" onClick={() => this.deleteProduct(product.id)}>Excluir</button>
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                })()}
            </div>
        )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoLista);