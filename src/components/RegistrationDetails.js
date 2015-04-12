/**
 *
 * Takes care of showing the details of a registration. The only thing that
 * this contains, that isn't on the registration list, is the longer
 * description.
 *
 * TODO: Add buttons to bill/unbill and delete
 * TODO: Extend with edit functionality
 * TODO: Find out if react has a better way of handling errors than the one
 * used below.
 *
 */

// Tools
import React from 'react';
import Time from '../helpers/Time';
import _ from 'lodash';
import cx from 'classnames';

// Constants
import Constants from '../constants/Constants';

// Stores
import RegistrationsStore from '../stores/RegistrationsStore';
import CustomerStore from '../stores/CustomerStore';

// Components
import Controls from './Controls';



const RegistrationDetails = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function () {
        const id = parseInt(this.context.router.getCurrentParams().id, 10),
            registration = RegistrationsStore.getRegistrationById(id);

        if (!registration) {
            return {
                error: 'We couldn’t find your registration! :-('
            };
        }

        const customer = _.findWhere(CustomerStore.getAll(), {id: registration.customer_id});

        return {registration, customer};
    },

    render: function () {
        if (this.state.error) {
            return (
                <div className='error-page'>
                    <Controls page={Constants.Pages.DETAILS} />
                    <div className='error-message'>{this.state.error}</div>
                </div>
            );
        }

        const {title, time, description, billed} = this.state.registration,
            timeClass = cx({
                'time': true,
                'billed': billed
            });

        return (
            <div className='details-registration-container'>
                <Controls page={Constants.Pages.DETAILS} />
                <div className='details'>
                    <h1 className='customer'>{this.state.customer.name}</h1>
                    <div className={timeClass}>Logged: <span className='value'>{Time.prettyFull(time)}</span></div>
                    <div className='title'>{title}</div>
                    <div className='description'>{description}</div>
                </div>
            </div>
        );
    }
});

export default RegistrationDetails;
