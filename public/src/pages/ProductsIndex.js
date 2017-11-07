import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ValidateEmailAlertContainer from '../containers/ValidateEmailAlertContainer.js';
import ProductsList from '../containers/ProductsListContainer.js';

class ProductsIndex extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="products_index"/>
        <ValidateEmailAlertContainer/>
        <ProductsList />
      </div>
    );
  }
}


export default ProductsIndex;
