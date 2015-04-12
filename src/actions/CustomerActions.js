import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const CustomerActions = {
    add: name =>
        AppDispatcher.dispatch({
            actionType: Constants.Actions.ADD_CUSTOMER,
            name
        })
};

export default CustomerActions;

