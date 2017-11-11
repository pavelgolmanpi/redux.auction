
import {
  PLACE_BID, PLACE_BID_SUCCESS, PLACE_BID_FAILURE, RESET_PLACE_BID_STATE,
  FETCH_BIDS_FOR_PRODUCT, FETCH_BIDS_FOR_PRODUCT_SUCCESS, FETCH_BIDS_FOR_PRODUCT_FAILURE, RESET_BIDS_FOR_PRODUCT,
  VALIDATE_PLACE_BID, VALIDATE_PLACE_BID_SUCCESS, VALIDATE_PLACE_BID_FAILURE,
  DELETE_BID, DELETE_BID_SUCCESS, DELETE_BID_FAILURE, RESET_DELETED_BID,
 } from '../actions/bids';



const INITIAL_STATE = {
  newBid: {bid: false, error: null, loading: false},
  bidsForProduct: {bids: [], error:null, loading: false},
  needReloadBids: false
};

export default function(state = INITIAL_STATE, action) {
  let error;

  switch(action.type) {
    case PLACE_BID:
      return { ...state, newBid: {...state.newBid, loading: true}, needReloadBids: false};
    case PLACE_BID_SUCCESS:
      return { ...state, newBid: {bid: action.payload, error:null, loading: false}, needReloadBids: true};
    case PLACE_BID_FAILURE:
      error = action.payload || {message: action.payload.message};
      return { ...state, newBid: {bid: false, error: error, loading: false}, needReloadBids: false};
    case RESET_PLACE_BID_STATE:
      return { ...state, newBid: {bid: false, error: null, loading: false}, needReloadBids: false};


    case FETCH_BIDS_FOR_PRODUCT:
    	return { ...state, bidsForProduct: {bids:[], error: null, loading: true}, needReloadBids: false};
    case FETCH_BIDS_FOR_PRODUCT_SUCCESS:
      return { ...state, bidsForProduct: {bids: action.payload, error:null, loading: false}, needReloadBids: false};
    case FETCH_BIDS_FOR_PRODUCT_FAILURE:
      error = action.payload || {message: action.payload.message};
      return { ...state, bidsForProduct: {bids: [], error: error, loading: false}, needReloadBids: false};
    case RESET_BIDS_FOR_PRODUCT:
      return { ...state, bidsForProduct: {bids: [], error:null, loading: false}, needReloadBids: false};

      case VALIDATE_PLACE_BID:
        return {...state, newBid:{...state.newBid, error: null, loading: true}}
      case VALIDATE_PLACE_BID_SUCCESS:
        return {...state, newBid:{...state.newBid, error: null, loading: false}}
      case VALIDATE_PLACE_BID_FAILURE:
        let result = action.payload;
        if(!result) {
          error = {message: action.payload.message};
        } else {
          error = {value: result.value};
        }
        return {...state, newBid:{...state.newBid, error: error, loading: false}}



      case DELETE_BID:
        return {...state, deletedBid: {...state.deletedBid, loading: true}, needReloadBids: false}
      case DELETE_BID_SUCCESS:
        return {...state, deletedBid: {product:action.payload, error:null, loading: false}, needReloadBids: true}
      case DELETE_BID_FAILURE:
        error = action.payload || {message: action.payload.message};
        return {...state, deletedBid: {bid:null, error:error, loading: false}, needReloadBids: false}
      case RESET_DELETED_BID:
        return {...state,  deletedBid:{bid:null, error:null, loading: false}, needReloadBids: false}
    default:
      return state;
  }
}
