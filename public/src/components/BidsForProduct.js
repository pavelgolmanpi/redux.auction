import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

class BidsForProduct extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchBidsForProduct(this.props.productId);
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.needReloadBids){
          this.props.fetchBidsForProduct(this.props.productId);
      }
  }

  renderDeleteLink(bid){
    if(!this.props.authenticatedUser || bid.userId != this.props.authenticatedUser._id){
      return;
    }
    return (
      <button className="btn btn-warning pull-xs-right"  onClick={()=> {this.props.onDeleteClick(bid._id)}}>Delete</button>
    );
  }

  renderBids(bids) {
    return bids.map((bid) => {
      return (
        <li className="list-group-item" key={bid._id}>
            {bid.value} from {bid.userName} {this.renderDeleteLink(bid)}
        </li>
      );
    });
  }

  render() {
    const { bids, loading, error } = this.props.bidsForProduct;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>
    } else if(!bids) {
      return <span />
    }

    return (
      <div className="container">
        <h3>Bids</h3>
        <ul className="list-group">
          {this.renderBids(bids)}
        </ul>
      </div>
    );
  }
}

export default BidsForProduct;
