import { combineReducers } from 'redux';
import ProductsReducer from './reducer_products';
import UserReducer from './reducer_user';
import ValidateUserFieldsReducer from './reducer_validateUserFields';
import ResendEmailReducer from './reducer_resendEmail';
import UpdateEmailReducer from './reducer_updateEmail';
import PlaceBidReducer from './reducer_placeBid';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user: UserReducer,
  validateFields: ValidateUserFieldsReducer,
  products: ProductsReducer, //<-- Products
  form: formReducer, // <-- redux-form
  resendEmail: ResendEmailReducer,
  updateEmail: UpdateEmailReducer,
  placeBid: PlaceBidReducer
});

export default rootReducer;
