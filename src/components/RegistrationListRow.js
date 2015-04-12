/**
 *
 * Shows a single row on the registration list.
 *
 */


// Tools
import React from 'react';
import cx from 'classnames';
import Time from '../helpers/Time';
import {Link} from 'react-router';

// Constants
import Constants from '../constants/Constants';

// Actions
import RegistrationActions from '../actions/RegistrationActions';


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
                    <Link
                        title='Press "Enter" or "O"'
                        className='details-btn small-btn'
                        to='details/:id'
                        params={{id: this.props.registration.id}}
                    >View</Link>

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
    }
});

export default RegistrationListRow;

