/**
 *
 * This is the page of creating a new registration.
 *
 * Uses two helpers to validate and parse time registrations properly.
 *
 * TODO: Rename to RegistrationCreate so it matches the others (List and
 * Details)
 * TODO: :%s/new/create/g
 *
 */


// Tools
import React from 'react';
import Validate from '../helpers/Validate';
import Time from '../helpers/Time';
import {Link} from 'react-router';
import _ from 'lodash';

// Constants
import Constants from '../constants/Constants';

// Stores
import CustomerStore from '../stores/CustomerStore';

// Actions
import RegistrationActions from '../actions/RegistrationActions';
import CustomerActions from '../actions/CustomerActions';

// Components
import Controls from './Controls';



const NewRegistration = React.createClass({
   contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function () {
        const customers = CustomerStore.getAll();

        return {
            customers: customers,
            customer_id: localStorage.getItem('customer_id') || customers[0].id,
            title: '',  // Should this be persisted too?
            time: localStorage.getItem('time') || '1h',
            description: '',
            showTitleError: false,
            showTimeError: false,
            showNewCustomer: false,
            newCustomerName: ''
        };
    },

    componentDidMount: function () {
        CustomerStore.addChangeListener(this._onCustomerStoreChange);
        // We want to set the focus on the select element to ease the use of
        // keyboard navigation.
        this.refs.select.getDOMNode().focus();
    },

    componentWillUnmount: function () {
        CustomerStore.removeChangeListener(this._onCustomerStoreChange);
    },

    _onCustomerStoreChange: function () {
        this.setState({
            customers: CustomerStore.getAll()
        });
    },

    render: function () {
            // <option>s for the customer <select>
        const customerOptions = this.state.customers.map((customer, key) => <option key={key} value={customer.id}>{customer.name}</option>),

            // Error messages
            titleErrorDisplay = this.state.showTitleError ? <div className='title-error error'>Remember a title</div> : null,
            timeErrorDisplay = this.state.showTimeError ? <div className='time-error error'>What kind of time is that?</div> : null,

            // Showing the time correctly
            timeInMinutes = Time.parse(this.state.time),
            prettyTime = timeInMinutes ? <small>{Time.prettyFull(timeInMinutes)}</small> : <small>?</small>;



        return (
            <div className='new-registration-container'>
                <Controls page={Constants.Pages.NEW} />

                <div className='new-registration-form'>
                    <h1>New registration</h1>

                    <label className='label-customer'>
                        <span>Customer</span>

                        <select
                            className={this.state.showNewCustomer ? 'hide' : ''}
                            ref='select'
                            value={this.state.customer_id}
                            onChange={this._onFieldChange.bind(this, 'customer_id')}
                        >{customerOptions}</select>

                        <a
                            className={this.state.showNewCustomer ? 'add-new hide' : 'add-new'}
                            href='#'
                            onClick={this._toggleNewCustomer}
                        >new</a>

                        <input
                            placeholder='Name of the new customer'
                            ref='newCustomerInput'
                            className={!this.state.showNewCustomer ? 'hide' : ''}
                            type='text'
                            value={this.state.newCustomerName}
                            onChange={this._changeNewCustomer}
                        />
                    </label>

                    <label className='label-title'>
                        <span>Title</span>
                        <input
                            placeholder='What did you do?'
                            value={this.state.title}
                            onChange={this._onFieldChange.bind(this, 'title')}
                            onKeyUp={this.validateTitle}
                        />
                        {titleErrorDisplay}
                    </label>

                    <label className='label-time'>
                        <span>Time spent</span>
                        <input value={this.state.time} onChange={this._onFieldChange.bind(this, 'time')} onKeyUp={this.validateTime} />
                        {prettyTime}
                        {timeErrorDisplay}
                    </label>

                    <label className='label-description'>
                        <span>Full description <small>(optional)</small></span>
                        <textarea value={this.state.description} onChange={this._onFieldChange.bind(this, 'description')} />
                    </label>

                    <button onClick={this.registerTime} className='btn btn-submit create-new-registration-btn'>Register time</button>
                </div>
            </div>
        );
    },

    validateTitle: function (event) {
        const title = event ? event.target.value : this.state.title;

        this.setState({
            showTitleError: !Validate.title(title)
        });
    },

    validateTime: function (event) {
        const time = event ? event.target.value : this.state.time;

        this.setState({
            showTimeError: !Validate.time(Time.parse(time))
        });
    },

    _onFieldChange: function (key, {target}) {
        this.setState({
            [key]: key === 'customer_id' ? parseInt(target.value, 10) : target.value
        });
    },

    _toggleNewCustomer: function (event) {
        const self = this;

        event.preventDefault();

        this.setState({
            showNewCustomer: !this.state.showNewCustomer
        });

        // This is such a hack :(
        _.defer(() => self.refs.newCustomerInput.getDOMNode().focus());
    },

    _changeNewCustomer: function ({target}) {
        this.setState({
            newCustomerName: target.value
        });
    },

    // Called when "form" is submitted.
    registerTime: function () {
        let customer_id = this.state.customer_id;

        if (this.state.showNewCustomer) {
            CustomerActions.add(this.state.newCustomerName);

            customer_id = this.state.customers[this.state.customers.length-1].id
        }

        // Construct the data we need, from the current state.
        const newTime = {
            customer_id: parseInt(customer_id, 10),
            title: this.state.title,
            time: Time.parse(this.state.time),
            description: this.state.description
        };

        if (Validate.newRegistration(newTime)) {
            // Save defaults
            localStorage.setItem('customer_id', this.state.customer_id);
            localStorage.setItem('time', this.state.time);

            // Add it, and go to the list
            RegistrationActions.create(newTime);
            this.context.router.transitionTo('/');
        } else {
            this.validateTitle();
            this.validateTime();
        }
    }
});

export default NewRegistration;

