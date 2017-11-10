import axios from 'axios';

export const PLACE_BID = 'PLACE_BID';
export const PLACE_BID_SUCCESS = 'PLACE_BID_SUCCESS';
export const PLACE_BID_FAILURE = 'PLACE_BID_FAILURE';
export const RESET_PLACE_BID_STATE = 'RESET_PLACE_BID_STATE';

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
