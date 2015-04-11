// Tools
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';

// Constants
import Constants from '../constants/Constants';

const CHANGE_EVENT = 'change';

// Data contained by the store.
let page = Constants.Pages.LIST,
    tab = Constants.Tabs.NEW,
    detailsId = null;


const NavigationStore = assign({}, EventEmitter.prototype, {
    getPage: () => page,

    getTab: () => tab,

    getDetailsId: () => detailsId,

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(action => {
    switch (action.actionType) {
    case Constants.Actions.CHANGE_PAGE:
        page = action.page;
        if (page === Constants.Pages.DETAILS) {
            detailsId = action.id;
        }
        NavigationStore.emitChange();
        break;

    case Constants.Actions.CHANGE_TAB:
        tab = action.tab;
        NavigationStore.emitChange();
        break;
    }
});

export default NavigationStore;

