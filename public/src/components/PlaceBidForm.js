import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { placeBid, placeBidSuccess, placeBidFailure, resetPlaceBidState, validatePlaceBid, validatePlaceBidSuccess, validatePlaceBidFailure } from '../actions/bids';
import renderField from './renderField';
import renderHiddenField from './renderHiddenField'
import { reduxForm, Field, SubmissionError } from 'redux-form';

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.bid || values.bid.trim() === '') {
    errors.bid = 'Enter bid value';
    hasErrors = true;
  }
  return hasErrors && errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {
  return dispatch(validatePlaceBid(values))
    .then((result) => {
      let {data, status} = result.payload;
      if (status != 200 || data.value) {
        dispatch(validatePlaceBidFailure(data));
        throw data;
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validatePlaceBidSuccess(data));
      }
    });
};

const validateAndPlaceBid = (values, dispatch) => {
  return dispatch(placeBid(values, sessionStorage.getItem('jwtToken')))
    .then((result) => {

      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(placeBidFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }

      dispatch(placeBidSuccess(result.payload.data));
    });
};

class PlaceBidForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {


  }

  getMessage() {
    const {error, bid} = this.props.bid ? this.props.bid : {error: null, bid: null};
    if (error) {
      return <div className="alert alert-danger">
               { error.bid}
             </div>
    } else if (bid) {
      return <div className="alert alert-info">
               Bid was placed!
             </div>
    } else {
      return <span/>
    }
  }

  render() {
    const {handleSubmit, submitting} = this.props;

    if(!this.props.authenticatedUser){
      return (
        <p style="color:red">You must be loggedin for place bids</p>
      );
    }

    return (
      <div>
         {this.getMessage() }
        <form onSubmit={ handleSubmit(validateAndPlaceBid.bind(this)) }>
          <Field
               name="productId"
               component="input"
               type="hidden"
                />
          <Field
                 name="value"
                 type="number"
                 component={ renderField }
                 label="Bid Value*" />
          <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={ submitting }>
            Place bid
          </button>
        </form>
      </div>
      );
  }
}


export default reduxForm({
  form: 'PlaceBidForm',
  fields: ['amount'],
  asyncValidate,
  asyncBlurFields: ['amount'],
  validate
})(PlaceBidForm)
