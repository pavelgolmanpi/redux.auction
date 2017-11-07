import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from '../actions/products';
import Header from '../containers/HeaderContainer.js';
import ProductDetailsContainer from '../containers/ProductDetailsContainer.js';

class ProductsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteClick() {
    this.props.deleteProduct(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    return (
      <div className='container'>
        <Header type="products_show" productId={this.props.params.id}/>
        <ProductDetailsContainer id={this.props.params.id}/>
      </div>
    );
  }
}

export default ProductsShow;
