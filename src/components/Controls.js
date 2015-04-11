// Tools
import React from 'react';

// Constants
import Constants from '../constants/Constants';

// Actions
import RegistrationActions from '../actions/RegistrationActions';
import NavigationActions from '../actions/NavigationActions';


const Controls = React.createClass({
    render: function () {
        // If this is not the controls for the list, then we just display a
        // simple "go back" controls header.
        if (this.props.page !== Constants.Pages.LIST) {
            return (
                <div className='controls'>
                    <button
                        title='Press "Esc"'
                        onClick={this.goBack}
                        className='btn btn-cancel cancel-new-btn'
                    >Go back</button>
                </div>
            );
        }

        const customerWithAll = [{id: -1, name: 'All customers'}].concat(this.props.customers),

            customers = customerWithAll.map((customer, key) =>
                <option key={key} value={customer.id}>{customer.name}</option>
            ),

            newTabClass = this.props.tab === Constants.Tabs.NEW ? 'active' : 'inactive',
            billedTabClass = this.props.tab === Constants.Tabs.BILLED ? 'active' : 'inactive';

        return (
            <div className='controls'>
                <button title='Press "N"' className='btn btn-submit create-new-btn' onClick={this.createNew}>New registration</button>
                <select value={this.props.filterId} onChange={this._toggleUsers}>{customers}</select>
                <div className='tabs'>
                    <a href='#' onClick={this._changeTab.bind(this, Constants.Tabs.NEW)} className={newTabClass}>New</a>
                    <a href='#' onClick={this._changeTab.bind(this, Constants.Tabs.BILLED)} className={billedTabClass}>Billed</a>
                </div>
            </div>
        );
    },

    goBack: () =>
        NavigationActions.changePage(Constants.Pages.LIST),

    _toggleUsers: ({target}) =>
        RegistrationActions.filterBy('customer_id', parseInt(target.value, 10)),

    _changeTab: (tab, event) => {
        event.preventDefault();
        RegistrationActions.changeTab(tab);
    },

    createNew: () => NavigationActions.changePage(Constants.Pages.NEW)
});

export default Controls;
