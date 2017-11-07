import ProductDetails from '../components/ProductDetails.js';
import { fetchProduct, fetchProductSuccess, fetchProductFailure, resetActiveProduct, resetDeletedProduct } from '../actions/products';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return {
    activeProduct: globalState.products.activeProduct,
    productId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => {
      dispatch(fetchProduct(id))
        .then((result) => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchProductFailure(result.payload.response.data));
          } else {
            dispatch(fetchProductSuccess(result.payload.data))
          }
        })
    },
    resetMe: () => {
      //clean up both activeProduct(currrently open) and deletedProduct(open and being deleted) states
      dispatch(resetActiveProduct());
      dispatch(resetDeletedProduct());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
