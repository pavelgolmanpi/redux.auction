import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import PlaceBidForm from './PlaceBidForm.js';
import BidsContainer from '../containers/BidsContainer.js';

class ProductDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.productId);
  }

  render() {
    const { product, loading, error } = this.props.activeProduct;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!product) {
      return <span />
    }

    //const initialValues = {productId: product._id};

    return (
      <div className="container">
        <h3>{product.title}</h3>
        <h6>Categories: {product.categories}</h6>
        <p>{product.content}</p>
        <BidsContainer
          product={product}
         />
      </div>
    );
  }
}

export default ProductDetails;
