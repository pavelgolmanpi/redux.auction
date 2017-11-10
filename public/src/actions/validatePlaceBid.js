import axios from 'axios';

export const VALIDATE_PLACE_BID = 'VALIDATE_PLACE_BID';
export const VALIDATE_PLACE_BID_SUCCESS = 'VALIDATE_PLACE_BID_SUCCESS';
export const VALIDATE_PLACE_BID_FAILURE = 'VALIDATE_PLACE_BID_FAILURE';
export const RESET_VALIDATE_PLACE_BID = 'RESET_VALIDATE_PLACE_BID';


//Note when running locally, the node server running on localhost:3000 and the dev-server is running on 8080
//When running on Heroku, we run both on the same port and so just /api is enough.
const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

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
