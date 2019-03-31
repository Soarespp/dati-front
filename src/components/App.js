import React, { Component } from 'react';
import Header from './Header';
import ProdutoLista from './ProdutoLista';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ProdutoLista />
      </div>

    )
  }
}

export default App;
