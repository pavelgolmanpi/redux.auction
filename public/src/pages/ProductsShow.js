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
    this.props.deleteProduct(this.props.match.params.id)
      .then(() => { this.context.router.history.push('/'); });
  }

  render() {
    return (
      <div className='container'>
        <Header type="products_show" productId={this.props.match.params.id}/>
        <ProductDetailsContainer id={this.props.match.params.id}/>
      </div>
    );
  }
}

export default ProductsShow;
