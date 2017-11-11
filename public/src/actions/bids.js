import axios from 'axios';

export const PLACE_BID = 'PLACE_BID';
export const PLACE_BID_SUCCESS = 'PLACE_BID_SUCCESS';
export const PLACE_BID_FAILURE = 'PLACE_BID_FAILURE';
export const RESET_PLACE_BID_STATE = 'RESET_PLACE_BID_STATE';


export const VALIDATE_PLACE_BID = 'VALIDATE_PLACE_BID';
export const VALIDATE_PLACE_BID_SUCCESS = 'VALIDATE_PLACE_BID_SUCCESS';
export const VALIDATE_PLACE_BID_FAILURE = 'VALIDATE_PLACE_BID_FAILURE';
export const RESET_VALIDATE_PLACE_BID = 'RESET_VALIDATE_PLACE_BID';


export const FETCH_BIDS_FOR_PRODUCT = 'FETCH_BIDS_FOR_PRODUCT';
export const FETCH_BIDS_FOR_PRODUCT_SUCCESS = 'FETCH_BIDS_FOR_PRODUCT_SUCCESS';
export const FETCH_BIDS_FOR_PRODUCT_FAILURE = 'FETCH_BIDS_FOR_PRODUCT_FAILURE';
export const RESET_BIDS_FOR_PRODUCT = 'RESET_BIDS_FOR_PRODUCT';


export const DELETE_BID = 'DELETE_BID';
export const DELETE_BID_SUCCESS = 'DELETE_BID_SUCCESS';
export const DELETE_BID_FAILURE = 'DELETE_BID_FAILURE';
export const RESET_DELETED_BID = 'RESET_DELETED_BID';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function placeBid(bid, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: bid,
    url: `${ROOT_URL}/bids`,
    headers: {'Authorization': `Bearer ${tokenFromStorage}`}
  });

  return {
    type: PLACE_BID,
    payload: request
  };
}

export function placeBidSuccess(bid) {
  return {
    type: PLACE_BID_SUCCESS,
    payload: bid
  };
}

export function placeBidFailure(error) {
  return {
    type: PLACE_BID_FAILURE,
    payload: error
  };
}

export function resetPlaceBidState() {
  return {
    type: RESET_PLACE_BID_STATE
  };
}



/******************************************
 * VALIDATION
 ******************************************/
 export function validatePlaceBid(bid) {
   const request = axios.post(`${ROOT_URL}/bids/validate`, bid);

   return {
     type: VALIDATE_PLACE_BID,
     payload: request
   };
 }

 export function validatePlaceBidSuccess() {
   return {
     type: VALIDATE_PLACE_BID_SUCCESS
   };
 }

 export function validatePlaceBidFailure(error) {
   return {
     type: VALIDATE_PLACE_BID_FAILURE,
     payload: error
   };
 }

 export function resetValidatePlaceBid() {
   return {
     type: RESET_VALIDATE_PLACE_BID
   }
 };


 /******************************************
  * FETCH LIST
  ******************************************/
  export function fetchBidsForProduct(productId) {
    const request = axios({
      method: 'get',
      url: `${ROOT_URL}/bids/${productId}`,
      headers: []
    });

    return {
      type: FETCH_BIDS_FOR_PRODUCT,
      payload: request
    };
  }

  export function fetchBidsForProductSuccess(bids) {
    return {
      type: FETCH_BIDS_FOR_PRODUCT_SUCCESS,
      payload: bids
    };
  }

  export function fetchBidsForProductFailure(error) {
    return {
      type: FETCH_BIDS_FOR_PRODUCT_FAILURE,
      payload: error
    };
  }


  /******************************************
   * DELETE ITEM
   ******************************************/

  export function deleteBid(id, tokenFromStorage) {
    const request = axios({
      method: 'delete',
      url: `${ROOT_URL}/bids/${id}`,
      headers: {
        'Authorization': `Bearer ${tokenFromStorage}`
      }
    });
    return {
      type: DELETE_BID,
      payload: request
    };
  }

  export function deleteBidSuccess(deletedBid) {
    return {
      type: DELETE_BID_SUCCESS,
      payload: deletedBid
    };
  }

  export function deleteBidFailure(response) {
    return {
      type: DELETE_BID_FAILURE,
      payload: response
    };
  }
