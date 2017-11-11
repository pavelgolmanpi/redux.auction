import PlaceBidForm from '../components/PlaceBidForm.js';
import { connect } from 'react-redux';


function mapStateToProps(globalState, ownProps) {
  const activeProduct = globalState.products.activeProduct;
  if(!activeProduct || !activeProduct.product){
    return {
      newBid: null,
      activeProduct: null,
      productId: null,
      initialValues: null
    };
  }
  
  return {
    newBid: globalState.bids.newBid,
    activeProduct: activeProduct,
    productId: activeProduct.product._id,
    authenticatedUser: globalState.user.status === 'authenticated' ? globalState.user.user : null,
    initialValues: {productId: activeProduct.product._id}
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //fetchBidsForProduct: (id) => {
    //  console.log('FFFFFFFFFFFF');
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
  //  },
    resetMe: () => {
      //clean up both activeProduct(currrently open) and deletedProduct(open and being deleted) states
      //dispatch(resetPlaceBidState());
      //dispatch(resetDeletedBid());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceBidForm);
