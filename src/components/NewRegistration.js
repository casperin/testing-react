// Tools
import React from 'react';
import Validate from '../helpers/Validate';
import Time from '../helpers/Time';

// Constants
import Constants from '../constants/Constants';

// Actions
import RegistrationActions from '../actions/RegistrationActions';
import NavigationActions from '../actions/NavigationActions';

// Components
import Controls from './Controls';



const NewRegistration = React.createClass({
    getInitialState: function () {
        return {
            customer_id: this.props.customers[0].id,
            title: '',
            time: localStorage.getItem('time') || '1h',
            description: '',
            showTitleError: false,
            showTimeError: false
        };
    },

    componentDidMount: function () {
        // We want to set the focus on the select element to ease the use of
        // keyboard navigation.
        this.refs.select.getDOMNode().focus();
    },

    render: function () {
            // Options for the customer select box
        const customerOptions = this.props.customers.map((customer, key) => <option key={key} value={customer.id}>{customer.name}</option>),

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
                        <select ref='select' onChange={this._onFieldChange.bind(this, 'customer_id')}>{customerOptions}</select>
                    </label>

                    <label className='label-title'>
                        <span>Title</span>
                        <input value={this.state.title} onChange={this._onFieldChange.bind(this, 'title')} onKeyUp={this.validateTitle} />
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

    registerTime: function () {
        const newTime = {
            customer_id: this.state.customer_id,
            title: this.state.title,
            time: Time.parse(this.state.time),
            description: this.state.description
        };

        if (Validate.newRegistration(newTime)) {
            localStorage.setItem('time', this.state.time);
            RegistrationActions.create(newTime);
            NavigationActions.changePage(Constants.Pages.LIST);
        } else {
            this.validateTitle();
            this.validateTime();
        }
    }
});

export default NewRegistration;
