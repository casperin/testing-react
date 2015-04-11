import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const NavigationActions = {
    changePage: (page, id) =>
        AppDispatcher.dispatch({
            actionType: Constants.Actions.CHANGE_PAGE,
            page,
            id
        }),

    changeTab: tab =>
        AppDispatcher.dispatch({
            actionType: Constants.Actions.CHANGE_TAB,
            tab
        })
};

export default NavigationActions;
