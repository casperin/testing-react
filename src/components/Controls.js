/**
 *
 * The controls is the grey top bar on every page. On the registration list
 * page, it contains controls for filtering and sorting the registrations. And
 * on every other page ('create' and 'details') it just has a "go back" button.
 *
 */

// Tools
import React from 'react';
import {Link} from 'react-router';

// Constants
import Constants from '../constants/Constants';

// Actions
import RegistrationActions from '../actions/RegistrationActions';


const Controls = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    render: function () {
        // If this is not the controls for the list, then we just display a
        // simple "go back" controls header.
        if (this.props.page !== Constants.Pages.LIST) {
            return (
                <div className='controls'>
                    <a href='#' onClick={this._goBack} title='Press "Esc"' className='btn btn-cancel'>Go back</a>
                </div>
            );
        }

        // Building the <option>s for the <select>
        const customersWithAll = [{id: -1, name: 'All customers'}].concat(this.props.customers),
            customers = customersWithAll.map((customer, key) =>
                <option key={key} value={customer.id}>{customer.name}</option>
            ),

            newTabClass = this.props.tab === Constants.Tabs.NEW ? 'active' : 'inactive',
            billedTabClass = this.props.tab === Constants.Tabs.BILLED ? 'active' : 'inactive';

        return (
            <div className='controls'>
                <Link title='Press "N"' className='btn btn-submit create-new-btn' to='create'>New registration</Link>
                <select value={this.props.filterId} onChange={this._toggleUsers}>{customers}</select>
                <div className='tabs'>
                    <Link to='list/:type' params={{type: 'new'}} className={newTabClass}>New</Link>
                    <Link to='list/:type' params={{type: 'billed'}} className={billedTabClass}>Billed</Link>
                </div>
            </div>
        );
    },

    _goBack: function (event) {
        event.preventDefault();
        if (!this.context.router.goBack()) {
            this.context.router.transitionTo('/');
        }
    },

    // <select> handler
    _toggleUsers: ({target}) =>
        RegistrationActions.filterBy('customer_id', parseInt(target.value, 10))
});

export default Controls;
