import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { placeBid, placeBidSuccess, placeBidFailure } from '../actions/placeBid';
import { validatePlaceBid, validatePlaceBidSuccess, validatePlaceBidFailure } from '../actions/validatePlaceBid';
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
      if (!result.payload.response) {
        return;
      }

      let {data, status} = result.payload.response;
      if (status != 200 || data.username || data.email) {
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
    console.log('NEXT PROPS');
    console.log(nextProps);
    if (nextProps.newBid.bid && !nextProps.newBid.error) {
    console.log('!!!!!!!!');
    }

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
    //https://redux-form.com/7.1.2/docs/api/field.md/#usage
//this.props.product._id
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
