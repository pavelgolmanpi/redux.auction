import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import PlaceBidForm from './PlaceBidForm.js';
import BidsForProductContainer from '../containers/BidsForProductContainer.js';
import PlaceBidContainer from '../containers/PlaceBidContainer.js';

class ProductDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.productId);
  }

  componentWillReceiveProps(nextProps) {
    
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

    return (
      <div className="container">
        <h3>{product.title}</h3>
        <h6>Categories: {product.categories}</h6>
        <p>{product.content}</p>
        <PlaceBidContainer product={product} />
        <BidsForProductContainer product={product} />
      </div>
    );
  }
}

export default ProductDetails;
