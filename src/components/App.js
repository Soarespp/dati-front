import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.scss';

class App extends Component {
  state = {
    isGetting: false,
    hasGetError: false,
    products: [],
    filter: ""
  }

  deleteProduct(id) {

    fetch(`http://18.228.14.48/api/products/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        this.setState((state) => ({
          products: state.products.filter((product) => product.id !== id)
        }))
      })
  }

  componentDidMount() {
    this.setState({
      isGetting: true,
      hasGetError: false
    })

    fetch("http://18.228.14.48/api/products?cmd=list")
      .then((response) => response.json())
      .then((products) => {
        this.setState({
          isGetting: false,
          hasGetError: false,
          products
        })
      })
      .catch(() => {
        this.setState({
          isGetting: false,
          hasGetError: true,
          products: []
        })
      })
  }

  render() {
    const { isGetting, hasGetError, products, filter } = this.state

    const regex = new RegExp(`^(.*)${filter}(.*)$`, "ig")

    return (
      <div className="App">
        <div className="header">
          <h1>Produtos Dati</h1>
          <Link className="edit" to="/produtos/novo">Novo</Link>
          <input
            type="text"
            placeholder="Buscar produto"
            onChange={(e) => this.setState({ filter: e.target.value })} />
        </div>

        <div className="container">
          {(() => {
            if (isGetting) {
              return <p>Carregando...</p>
            } else if (hasGetError) {
              return <p>Nao foi possivel buscar os produtos</p>
            } else if (!products.length) {
              return <p>Nao foi encontrado nenhum produto</p>
            } else {
              return (
                <ul className="products">
                  {products.filter((product) => product.description.match(regex)).map((product) => (
                    <li className="product">
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
      </div>
    );
  }
}

export default App;
