import ProductForm from '../components/ProductForm.js';
import { resetNewProduct } from '../actions/products';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewProduct());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    newProduct: state.products.newProduct
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
