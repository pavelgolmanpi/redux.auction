import PlaceBidForm from '../components/PlaceBidForm.js';
import { connect } from 'react-redux';


function mapStateToProps(globalState, ownProps) {
  return {
    newBid: globalState.placeBid.newBid,
    activeProduct: globalState.products.activeProduct,
    productId: globalState.products.activeProduct.product._id,
    initialValues: {productId: globalState.products.activeProduct.product._id}
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => {
/*
      dispatch(fetchBids(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchProductFailure(result.payload.response.data));
          } else {
            dispatch(fetchProductSuccess(result.payload.data))
          }
        })
        */
    },
    resetMe: () => {
      //clean up both activeProduct(currrently open) and deletedProduct(open and being deleted) states
      dispatch(resetPlaceBidState());
      //dispatch(resetDeletedBid());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceBidForm);
