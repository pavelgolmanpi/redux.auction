import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, resetDeletedProduct, deleteProduct, deleteProductSuccess, deleteProductFailure } from '../actions/products';
import { logoutUser } from '../actions/users';
import Header from '../components/header.js';



function mapStateToProps(state) {
  return {
    deletedProduct: state.products.deletedProduct,
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 onDeleteClick: () => {
      let token = sessionStorage.getItem('jwtToken');
      if (!token || token === '') { //if there is no token, dont bother,
          let data = {data: {message: 'Please Sign In'}};//axios like error
          dispatch(deleteProductFailure(data)); // but let other comps know
          return;
      }

    	dispatch(deleteProduct(ownProps.productId, token))
      	.then((response) => {
            !response.error ? dispatch(deleteProductSuccess(response.payload)) : dispatch(deleteProductFailure(response.payload));
          });
  	 },
     resetMe: () =>{
        dispatch(resetDeletedProduct());
     },

     logout: () => {
         sessionStorage.removeItem('jwtToken');
         dispatch(logoutUser());
     }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
