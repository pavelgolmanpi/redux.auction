
import { PLACE_BID, PLACE_BID_SUCCESS, PLACE_BID_FAILURE, RESET_PLACE_BID_STATE } from '../actions/placeBid';



const INITIAL_STATE = {newBid: {bid: false, error: null, loading: false}};

export default function(state = INITIAL_STATE, action) {
  let error;

  switch(action.type) {
    case PLACE_BID:
      return { ...state, newBid: {...state.newBid, loading: true}};
    case PLACE_BID_SUCCESS:
      return { ...state, newBid: {bid: action.payload, error:null, loading: false}};
    case PLACE_BID_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, newBid: {bid: false, error: error, loading: false}};
    case RESET_PLACE_BID_STATE:
      return { ...state, newBid: {bid: false, error: null, loading: false}};
    default:
      return state;
  }
}
