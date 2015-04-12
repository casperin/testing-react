import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const RegistrationActions = {
    create: time =>
        AppDispatcher.dispatch({
            actionType: Constants.Actions.CREATE,
            time
        }),

    toggleState: (key, id) =>
        AppDispatcher.dispatch({
            actionType: Constants.Actions.TOGGLE_STATE,
            key,
            id
        }),

    filterBy: (key, value) =>
        AppDispatcher.dispatch({
            actionType: Constants.Actions.FILTER_BY,
            key,
            value
        })
};

export default RegistrationActions;
