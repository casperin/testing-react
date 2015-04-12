// Tools
import AppDispatcher from '../dispatcher/AppDispatcher';
import assign from 'object-assign';
import {EventEmitter} from 'events';
import _ from 'lodash';

// Data
import customerData from '../data/customers';

// Constants
import Constants from '../constants/Constants';

const CHANGE_EVENT = 'change';

let customers = _.cloneDeep(customerData);


const CustomerStore = assign({}, EventEmitter.prototype, {
    getAll: () => customers,

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
    case Constants.Actions.ADD_CUSTOMER:
        customers.push({
            id: customers.length,
            name: action.name
        });
    }
});

export default CustomerStore;

