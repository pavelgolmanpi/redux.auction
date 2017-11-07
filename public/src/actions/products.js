import axios from 'axios';

//Product list
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const RESET_PRODUCTS = 'RESET_PRODUCTS';

//Create new product
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';
export const RESET_NEW_PRODUCT = 'RESET_NEW_PRODUCT';

//Validate product fields like Title, Categries on the server
export const VALIDATE_PRODUCT_FIELDS = 'VALIDATE_PRODUCT_FIELDS';
export const VALIDATE_PRODUCT_FIELDS_SUCCESS = 'VALIDATE_PRODUCT_FIELDS_SUCCESS';
export const VALIDATE_PRODUCT_FIELDS_FAILURE = 'VALIDATE_PRODUCT_FIELDS_FAILURE';
export const RESET_PRODUCT_FIELDS = 'RESET_PRODUCT_FIELDS';

//Fetch product
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';
export const RESET_ACTIVE_PRODUCT = 'RESET_ACTIVE_PRODUCT';

//Delete product
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
export const RESET_DELETED_PRODUCT = 'RESET_DELETED_PRODUCT';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
export function fetchProducts() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/products`,
    headers: []
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
  };
}

export function fetchProductsFailure(error) {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  };
}

export function validateProductFields(props) {
  //note: we cant have /products/validateFields because it'll match /products/:id path!
  const request = axios.post(`${ROOT_URL}/products/validate/fields`, props);

  return {
    type: VALIDATE_PRODUCT_FIELDS,
    payload: request
  };
}

export function validateProductFieldsSuccess() {
  return {
    type: VALIDATE_PRODUCT_FIELDS_SUCCESS
  };
}

export function validateProductFieldsFailure(error) {
  return {
    type: VALIDATE_PRODUCT_FIELDS_FAILURE,
    payload: error
  };
}

export function resetProductFields() {
  return {
    type: RESET_PRODUCT_FIELDS
  }
}
;


export function createProduct(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/products`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_PRODUCT,
    payload: request
  };
}

export function createProductSuccess(newProduct) {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: newProduct
  };
}

export function createProductFailure(error) {
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: error
  };
}

export function resetNewProduct() {
  return {
    type: RESET_NEW_PRODUCT
  }
}
;

export function resetDeletedProduct() {
  return {
    type: RESET_DELETED_PRODUCT
  }
}
;

export function fetchProduct(id) {
  const request = axios.get(`${ROOT_URL}/products/${id}`);

  return {
    type: FETCH_PRODUCT,
    payload: request
  };
}


export function fetchProductSuccess(activeProduct) {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: activeProduct
  };
}

export function fetchProductFailure(error) {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error
  };
}

export function resetActiveProduct() {
  return {
    type: RESET_ACTIVE_PRODUCT
  }
}


export function deleteProduct(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/products/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_PRODUCT,
    payload: request
  };
}

export function deleteProductSuccess(deletedProduct) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: deletedProduct
  };
}

export function deleteProductFailure(response) {
  return {
    type: DELETE_PRODUCT_FAILURE,
    payload: response
  };
}
