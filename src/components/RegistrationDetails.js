// Tools
import React from 'react';
import Time from '../helpers/Time';

// Constants
import Constants from '../constants/Constants';

// Actions
import NavigationActions from '../actions/NavigationActions';

// Components
import Controls from './Controls';



const RegistrationDetails = React.createClass({
    render: function () {
        const {title, time, description} = this.props.registration;

        return (
            <div className='details-registration-container'>
                <Controls page={Constants.Pages.DETAILS} />
                <div className='details'>
                    <h1 className='customer'>{this.props.customer.name}</h1>
                    <div className='time'>Logged: {Time.prettyFull(time)}</div>
                    <div className='title'>{title}</div>
                    <div className='description'>{description}</div>
                </div>
            </div>
        );
    },

    goBack: () => NavigationActions.changePage(Constants.Pages.LIST)
});

export default RegistrationDetails;
