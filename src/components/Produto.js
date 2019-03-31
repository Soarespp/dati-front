import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Produto.scss';

class Produto extends Component {
    state = {
        isGetting: false,
        hasGetError: false,
        product: {}
    }

    updateProductProp(key, value) {
        this.setState((state) => ({
            product: {
                ...state.product,
                [key]: value
            }
        }))
    }

    saveProduct(e) {
        e.preventDefault()

        const { match } = this.props

        this.setState((state) => ({
            product: {
                ...state.product,
                updated_at: new Date()
            }
        }))

        if (match.params.id !== "novo") {
            fetch(`http://18.228.14.48/api/products/${match.params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.product)
            })
        } else {
            fetch("http://18.228.14.48/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.product)
            })
        }

    }

    componentDidMount() {
        const { match } = this.props

        if (match.params.id !== "novo") {
            this.setState({
                isGetting: true,
                hasGetError: false
            })

            fetch(`http://18.228.14.48/api/products?cmd=details&id=${match.params.id}`)
                .then((response) => response.json())
                .then((product) => {
                    this.setState({
                        isGetting: false,
                        hasGetError: false,
                        product
                    })
                })
                .catch(() => {
                    this.setState({
                        isGetting: false,
                        hasGetError: true,
                        product: {}
                    })
                })
        }
    }

    render() {
        const { isGetting, hasGetError, product } = this.state

        return (
            <div className="Produto">
                <div className="header">
                    <h1>Produto {product.id}</h1>
                </div>

                <div className="container">
                    {(() => {
                        if (isGetting) {
                            return <p>Carregando...</p>
                        } else if (hasGetError) {
                            return <p>Nao foi possivel buscar o produto</p>
                        } else {
                            return (
                                <form>
                                    <fieldset>
                                        <legend>Descricao</legend>
                                        <input
                                            name="description"
                                            type="text"
                                            maxLength="150"
                                            value={product.description}
                                            onChange={(e) => this.updateProductProp(e.target.name, e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <legend>Codigo</legend>
                                        <input
                                            name="code"
                                            type="text"
                                            maxLength="10"
                                            value={product.code}
                                            onChange={(e) => this.updateProductProp(e.target.name, e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <legend>Descricao curta</legend>
                                        <input
                                            name="short_description"
                                            type="text"
                                            maxLength="30"
                                            value={product.short_description}
                                            onChange={(e) => this.updateProductProp(e.target.name, e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <legend>Valor</legend>
                                        <input
                                            name="value"
                                            type="number"
                                            value={product.value}
                                            onChange={(e) => this.updateProductProp(e.target.name, e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <legend>Qtd.</legend>
                                        <input
                                            name="qty"
                                            type="number"
                                            value={product.qty}
                                            onChange={(e) => this.updateProductProp(e.target.name, e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <input
                                            name="status"
                                            type="checkbox"
                                            checked={product.status === "enable"}
                                            onChange={(e) => this.updateProductProp(e.target.name, e.target.checked ? "enable" : "disable")}
                                        /> Ativado/Desativado
                                    </fieldset>
                                    <button onClick={(e) => this.saveProduct(e)} >
                                        <Link to="/" >Salvar</Link>
                                    </button>
                                    <Link to="/" >Cancelar</Link>
                                </form>
                            )
                        }
                    })()}
                </div>
            </div>
        );
    }
}

export default Produto;
