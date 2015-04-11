// Tools
import React from 'react';
import cx from 'classnames';
import Time from '../helpers/Time';

// Constants
import Constants from '../constants/Constants';

// Actions
import RegistrationActions from '../actions/RegistrationActions';
import NavigationActions from '../actions/NavigationActions';



const RegistrationListRow = React.createClass({
    render: function () {
        const rowClass = cx({
            billed: this.props.registration.billed,
            deleted: this.props.registration.deleted,
            activeRow: this.props.isActive
        });

        return (
            <tr className={rowClass}>
                <td className='info-td'>
                    <span className='customer'>{this.props.customerName}</span>
                    <span className='title'>{this.props.registration.title}</span>
                </td>
                <td className='time'>{Time.pretty(this.props.registration.time)}</td>
                <td className='registration-controls'>
                    <button
                        title='Press "Enter" or "O"'
                        className='details-btn small-btn'
                        onClick={this._showDetails}
                    >View</button>

                    <button
                        title='Press "B"'
                        className='bill-btn small-btn'
                        onClick={this._changeState.bind(this, 'billed')}
                    >
                        {this.props.registration.billed ? 'Unbill' : 'Bill'}
                    </button>

                    <a
                        href='#'
                        className='delete-btn'
                        title='Delete this registration'
                        onClick={this._changeState.bind(this, 'deleted')}
                    >&times;</a>
                </td>
            </tr>
        );
    },

    // Toggle the state (`billed` or `deleted`) of a registration.
    _changeState: function (key, event) {
        if (event) {
            event.preventDefault();
        }

        RegistrationActions.toggleState(key, this.props.registration.id);
    },

    // Go to the Details view of this
    _showDetails: function () {
        NavigationActions.changePage(Constants.Pages.DETAILS, this.props.registration.id);
    }
});

export default RegistrationListRow;

