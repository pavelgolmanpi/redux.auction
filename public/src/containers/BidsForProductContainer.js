import BidsForProduct from '../components/BidsForProduct.js';
import { fetchBidsForProduct, fetchBidsForProductSuccess, fetchBidsForProductFailure, resetBidsForProduct  } from '../actions/bids';
import { deleteBid, deleteBidSuccess, deleteBidFailure, resetDeleteBid  } from '../actions/bids';
import { connect } from 'react-redux';

function mapStateToProps(globalState, ownProps) {
  const activeProduct = globalState.products.activeProduct;
  return {
    newBid: globalState.bids.newBid,
    bidsForProduct: globalState.bids.bidsForProduct,
    activeProduct: activeProduct,
    productId: activeProduct.product._id,
    needReloadBids: globalState.bids.needReloadBids,
    authenticatedUser: globalState.user.status === 'authenticated' ? globalState.user.user : null,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBidsForProduct: (id) => {
      dispatch(fetchBidsForProduct(id))
        .then((result) => {
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchBidsForProductFailure(result.payload.response.data));
          } else {
            dispatch(fetchBidsForProductSuccess(result.payload.data))
          }
        })
    },
    onDeleteClick: (id) => {
     let token = sessionStorage.getItem('jwtToken');
     if (!token || token === '') { //if there is no token, dont bother,
         let data = {data: {message: 'Please Sign In'}};//axios like error
         dispatch(deleteBidFailure(data)); // but let other comps know
         return;
     }

     dispatch(deleteBid(id, token))
       .then((response) => {
           !response.error ? dispatch(deleteBidSuccess(response.payload)) : dispatch(deleteBidFailure(response.payload));
         });
    },
    resetMe: () => {
      //dispatch(resetBidsForProduct());
      //dispatch(resetDeletedBid());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BidsForProduct);
