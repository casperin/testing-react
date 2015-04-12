/**
 *
 * The RegistrationList takes care of showing the list, updating the active
 * row, and listening for shortcuts that are unique to this page.
 *
 * It generally does not care what kind of registrations are being shown. Only
 * the Controls component, and the registration itself does.
 *
 * TODO: Consider moving keyboard handling out of the file. I'm sure react (or
 * some react extension) has a far better (and i18n?) way of handling this.
 *
 */

// Tools
import React from 'react';
import _ from 'lodash';
import Time from '../helpers/Time';

// Constants
import Constants from '../constants/Constants';

// Stores
import RegistrationsStore from '../stores/RegistrationsStore';
import CustomerStore from '../stores/CustomerStore';

// Actions
import RegistrationActions from '../actions/RegistrationActions';

// Components
import Controls from './Controls';
import RegistrationListRow from './RegistrationListRow';



const RegistrationList = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function () {
        const type = this.context.router.getCurrentParams().type;

        return {
            type: type,
            registrations: RegistrationsStore.getRegistrations(type),
            filterId: RegistrationsStore.getFilterId(),
            customers: CustomerStore.getAll(),
            activeRow: 0
        };
    },

    componentWillReceiveProps: function () {
        const type = this.context.router.getCurrentParams().type;

        this.setState({
            type: type,
            registrations: RegistrationsStore.getRegistrations(type)
        });
    },

    componentDidMount: function () {
        RegistrationsStore.addChangeListener(this._onRegistrationChange);
        document.addEventListener("keydown", this._handleDocumentKeyDown, false);
    },

    componentWillUnmount: function () {
        RegistrationsStore.removeChangeListener(this._onRegistrationChange);
        document.removeEventListener("keydown", this._handleDocumentKeyDown, false);
    },

    _onRegistrationChange: function () {
        const type = this.context.router.getCurrentParams().type;

        this.setState({
            type: type,
            registrations: RegistrationsStore.getRegistrations(type),
            filterId: RegistrationsStore.getFilterId()
        });
    },

    render: function () {
        const controls = <Controls
                page={Constants.Pages.LIST}
                filterId={this.state.filterId}
                customers={this.state.customers}
                tab={this.state.type}
            />;

        if (this.state.registrations.length === 0) {
            return (
                <div className='empty-list-container'>
                    {controls}
                    <div className='empty-list-message'>No registrations here&hellip;</div>
                </div>
            );
        }

        const registrationRows = this.state.registrations.map((registration, key) =>
            <RegistrationListRow
                registration={registration}
                key={key}
                isActive={this.state.activeRow === key}
                customerName={this._getCustomerName(registration.customer_id)}
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
                        {Time.prettyFull(this.state.registrations.map(i => i.time).reduce(_.add, 0))}
                    </div>
                </div>
            </div>
        );
    },

    _getCustomerName: function (id) {
        return _.findWhere(this.state.customers, {id}).name;
    },

    _handleDocumentKeyDown: function ({keyCode}) {
        // Not to self: Deconstruction is pretty neat.
        const {RETURN, O, UP, K, DOWN, J, F, R, B, N} = Constants.Keys,
            {registrations, activeRow} = this.state;

        switch (keyCode) {
        case RETURN:
        case O:
            this.context.router.transitionTo('details/:id', {id: registrations[activeRow].id});
            break;

        case UP:
        case K:
            this.setState({
                activeRow: activeRow <= 0 ? registrations.length - 1 : activeRow - 1
            });
            break;

        case DOWN:
        case J:
            this.setState({
                activeRow: activeRow >= registrations.length - 1 ? 0 : activeRow + 1
            });
            break;

        case F:
            RegistrationActions.filterBy('customer_id', registrations[activeRow].customer_id);
            break;

        case R:
            RegistrationActions.filterBy('customer_id', -1);
            break;

        case B:
            RegistrationActions.toggleState('billed', registrations[activeRow].id);
            break;

        case N:
            this.context.router.transitionTo('create');
            break;
        }
    }
});

export default RegistrationList;
