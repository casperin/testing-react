// Tools
import React from 'react';
import _ from 'lodash';

// Constants
import Constants from '../constants/Constants';

// Stores
import RegistrationsStore from '../stores/RegistrationsStore';
import CustomerStore from '../stores/CustomerStore';
import NavigationStore from '../stores/NavigationStore';

// Actions
import NavigationActions from '../actions/NavigationActions';

// Compononents
import RegistrationList from './RegistrationList';
import NewRegistration from './NewRegistration';
import RegistrationDetails from './RegistrationDetails';
import Shortcuts from './Shortcuts';


const RegistrationOverview = React.createClass({
    getInitialState: () => ({
        page: NavigationStore.getPage(),
        tab: NavigationStore.getTab(),
        registrations: RegistrationsStore.getRegistrations(),
        filterId: RegistrationsStore.getFilterId(),
        customers: CustomerStore.getAll(),
        showShortcuts: false
    }),

    componentDidMount: function () {
        NavigationStore.addChangeListener(this._onNavigationChange);
        RegistrationsStore.addChangeListener(this._onRegistrationChange);
        document.addEventListener("keydown", this._handleDocumentKeyDown, false);
    },

    componentWillUnmount: function() {
        NavigationStore.removeChangeListener(this._onNavigationChange);
        RegistrationsStore.removeChangeListener(this._onRegistrationChange);
        document.removeEventListener("keydown", this._handleDocumentKeyDown, false);
    },

    render: function () {
        let page = null;

        // Pull out the parts we need
        const {registrations, customers, tab, filterId} = this.state;

        switch (this.state.page) {
        case Constants.Pages.LIST:
            page = <RegistrationList filterId={filterId} registrations={registrations} customers={customers} tab={tab} />;
            break;

        case Constants.Pages.NEW:
            page = <NewRegistration customers={customers} />
            break;

        case Constants.Pages.DETAILS:
            const id = NavigationStore.getDetailsId(),
                registration = _.findWhere(registrations, {id}),
                customer = _.findWhere(customers, {id: registration.customer_id});

            page = <RegistrationDetails registration={registration} customer={customer} />
            break;
        }

        return (
            <div className='registrations-container'>
                <Shortcuts display={this.state.showShortcuts} />
                {page}
            </div>
        );
    },

    _handleDocumentKeyDown: function ({keyCode}) {
        if (keyCode === Constants.Keys.ESC) {
            if (this.state.showShortcuts) {
                this.setState({showShortcuts: false});
            } else {
                NavigationActions.changeTab(Constants.Tabs.NEW)
                NavigationActions.changePage(Constants.Pages.LIST)
            }
        }

        // If the focused element is something where you can actually use your
        // keyboard, then we bail out.
        const tagName = document.activeElement.tagName;

        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
            return;
        }

        if (keyCode === Constants.Keys.QUESTION_MARK || keyCode === Constants.Keys.H) {
            this.setState({
                showShortcuts: !this.state.showShortcuts
            });
        }
    },

    _onRegistrationChange: function () {
        this.setState({
            registrations: RegistrationsStore.getRegistrations(),
            filterId: RegistrationsStore.getFilterId(),
            showShortcuts: false
        });
    },

    _onNavigationChange: function () {
        this.setState({
            page: NavigationStore.getPage(),
            tab: NavigationStore.getTab(),
            showShortcuts: false
        });
    }
});

export default RegistrationOverview;

