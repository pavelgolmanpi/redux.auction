import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductsList extends Component {
  componentWillMount() {
    this.props.fetchProducts();
  }

  renderCategories(categories) {
     return categories.map((c) => {
        c = c.trim();
        return (
          <Link to={"filter/" + c} key={c} className="list-group-item-text">{" " + c + " "}</Link>
        );
     });
  }

  renderProducts(products) {
    return products.map((product) => {
      return (
        <li className="list-group-item" key={product._id}>
          <Link style={{color:'black'}} to={"products/" + product._id}>
            <h3 className="list-group-item-heading">{product.title}</h3>
          </Link>
            {this.renderCategories(product.categories)}
        </li>
      );
    });
  }

  render() {
    const { products, loading, error } = this.props.productsList;

    if(loading) {
      return <div className="container"><h1>Products</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h3>Products</h3>
        <ul className="list-group">
          {this.renderProducts(products)}
        </ul>
      </div>
    );
  }
}


export default ProductsList;
