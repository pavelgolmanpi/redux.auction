import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ProductFormContainer from '../containers/ProductFormContainer.js';

class ProductsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="products_new"/>
        <ProductFormContainer />
      </div>
    );
  }
}


export default ProductsNew;
