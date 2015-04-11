// Tools
import React from 'react';
import _ from 'lodash';
import Time from '../helpers/Time';

// Constants
import Constants from '../constants/Constants';

// Actions
import RegistrationActions from '../actions/RegistrationActions';
import NavigationActions from '../actions/NavigationActions';

// Components
import Controls from './Controls';
import RegistrationListRow from './RegistrationListRow';


/**
 *
 * The RegistrationList takes care of showing the list, updating the active
 * row, and listening for shortcuts that are unique to this page.
 *
 * It generally does not care what kind of registrations are being shown. Only
 * the Controls component, and the registration itself does.
 *
 */
const RegistrationList = React.createClass({
    getCustomerName: function (id) {
        return _.findWhere(this.props.customers, {id}).name;
    },

    getInitialState: () => ({activeRow: 0}),

    componentDidMount: function () {
        document.addEventListener("keydown", this._handleDocumentKeyDown, false);
    },

    componentWillUnmount: function() {
        document.removeEventListener("keydown", this._handleDocumentKeyDown, false);
    },

    render: function () {
        const controls = <Controls
            page={Constants.Pages.LIST}
            filterId={this.props.filterId}
            customers={this.props.customers}
            tab={this.props.tab}
        />;

        if (this.props.registrations.length === 0) {
            return (
                <div className='empty-list-container'>
                    {controls}
                    <div className='empty-list-message'>No registrations here&hellip;</div>
                </div>
            );
        }

        const registrationRows = this.props.registrations.map((registration, key) =>
            <RegistrationListRow
                registration={registration}
                key={key}
                isActive={this.state.activeRow === key}
                customerName={this.getCustomerName(registration.customer_id)}
            />
        );

        return (
            <div className='registrations-list-container'>
                {controls}
                <div className='registrations-list'>
                    <h1>Registrations Overview</h1>
                    <table className='registrations-table'>
                        <tbody>{registrationRows}</tbody>
                    </table>
                    <div className='total'>
                        <span className='total-label'>Total time:</span>
                        {Time.prettyFull(this.props.registrations.map(i => i.time).reduce(_.add, 0))}
                    </div>
                </div>
            </div>
        );
    },

    _handleDocumentKeyDown: function ({keyCode}) {
        let newActiveRow;

        switch (keyCode) {
        case Constants.Keys.RETURN:
        case Constants.Keys.O:
            NavigationActions.changePage(Constants.Pages.DETAILS, this.props.registrations[this.state.activeRow].id);
            break;

        case Constants.Keys.UP:
        case Constants.Keys.K:
            newActiveRow = this.state.activeRow - 1;
            this.setState({
                activeRow: newActiveRow < 0 ? this.props.registrations.length - 1 : newActiveRow
            });
            break;

        case Constants.Keys.DOWN:
        case Constants.Keys.J:
            newActiveRow = this.state.activeRow + 1;
            this.setState({
                activeRow: newActiveRow >= this.props.registrations.length ? 0 : newActiveRow
            });
            break;

        case Constants.Keys.F:
            const customer_id = this.props.registrations[this.state.activeRow].customer_id;
            RegistrationActions.filterBy('customer_id', customer_id);
            break;

        case Constants.Keys.R:
            RegistrationActions.filterBy('customer_id', -1);
            break;

        case Constants.Keys.B:
            RegistrationActions.toggleState('billed', this.props.registrations[this.state.activeRow].id);
            break;

        case Constants.Keys.N:
            NavigationActions.changePage(Constants.Pages.NEW);
            break;
        }
    }
});

export default RegistrationList;
