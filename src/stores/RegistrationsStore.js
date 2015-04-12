/**
 *
 * Main store in this little app. It takes care of listening for changes and
 * update time registrations, as well as filtering them as needed when asked
 * to.
 *
 */

// Tools
import AppDispatcher from '../dispatcher/AppDispatcher';
import assign from 'object-assign';
import {EventEmitter} from 'events';
import _ from 'lodash';

// Constants
import Constants from '../constants/Constants';

// Data
import registrationData from '../data/registrations.js';

// Strictly speaking, this is not needed, but it seems wrong to edit something
// that is imported. Doesn't matter much, in the real world, it would not be
// imported, but rather arrive through an ajax call.
// And yes, we can use `const` because we are never editing the value itself,
// only "children" of it.
let registrations = _.cloneDeep(registrationData);

const CHANGE_EVENT = 'change';

const filters = {
    customer_id: -1, // all
    billed: false
};

const RegistrationsStore = assign({}, EventEmitter.prototype, {
    getRegistrations: type =>
        registrations
            .filter(r => type === 'billed' ? r.billed : !r.billed)
            .filter(r => !r.deleted)
            .filter(r => filters.customer_id < 0 || r.customer_id === filters.customer_id),

    getRegistrationById: id => _.findWhere(registrations, {id}),

    getFilterId: () => filters.customer_id,

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

// Listening for events from the RegistrationActions.
AppDispatcher.register(action => {
    switch (action.actionType) {
    case Constants.Actions.CREATE:
        registrations.push(_.extend({
            id: registrations.length,   // This would normally be set in the backend
            deleted: false,             // Maybe these too...
            billed: false
        }, action.time));
        RegistrationsStore.emitChange();
        break;

    case Constants.Actions.TOGGLE_STATE:
        const registration = _.findWhere(registrations, {id: action.id});
        registration[action.key] = !registration[action.key];
        RegistrationsStore.emitChange();
        break;

    case Constants.Actions.FILTER_BY:
        filters[action.key] = action.value;
        RegistrationsStore.emitChange();
        break;
    }
});

export default RegistrationsStore;

