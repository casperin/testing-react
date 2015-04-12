/**
 *
 * This is the main file that includes everything else (except the css of
 * course). Its main responsibility is routing, but it also handles a listening
 * for the Esc and the ?-key.
 *
 * It should remain free of Actions and Store logic. (ie. don't handle data
 * directly).
 *
 * TODO: Abstract the keyboard handling out. (see also RegistrationList)
 *
 */

// Tools
import React from 'react';
import _ from 'lodash';
import Router from 'react-router';
const { Route, Redirect, RouteHandler, Link, NotFoundRoute } = Router;

// Constants
import Constants from '../constants/Constants';

// Compononents
import RegistrationList from './RegistrationList';
import NewRegistration from './NewRegistration';
import RegistrationDetails from './RegistrationDetails';
import Shortcuts from './Shortcuts';


const RegistrationOverview = React.createClass({
    // This can be found in a lot of components. This is required by
    // react-router, to access `this.context.router`.
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: () => ({
        showShortcuts: false
    }),

    componentDidMount: function () {
        document.addEventListener("keydown", this._handleDocumentKeyDown, false);
    },

    componentWillUnmount: function() {
        document.removeEventListener("keydown", this._handleDocumentKeyDown, false);
    },

    _handleDocumentKeyDown: function ({keyCode}) {
        if (keyCode === Constants.Keys.ESC) {
            if (this.state.showShortcuts) {
                this.setState({showShortcuts: false});
            } else {
                // Attempt to go back, if that doesn't work (most likely
                // because the page was refreshed), we just transfer to the
                // main page.
                if (!this.context.router.goBack()) {
                    this.context.router.transitionTo('/');
                }
            }
        }

        // If the focused element is something where you can actually use your
        // keyboard, then we bail out.
        const tagName = document.activeElement.tagName;

        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
            return;
        }

        if (keyCode === Constants.Keys.QUESTION_MARK || keyCode === Constants.Keys.H) {
            this.setState({
                showShortcuts: !this.state.showShortcuts
            });
        }
    },

    render: function () {
        return (
            <div className='registrations-container'>
                <Shortcuts display={this.state.showShortcuts} />
                <RouteHandler />
            </div>
        );
    }
});

const routes = (
    <Route handler={RegistrationOverview}>
        <Route name='list/:type' handler={RegistrationList} />
        <Route name='create' handler={NewRegistration} />
        <Route name='details/:id' handler={RegistrationDetails} />
        <Redirect from="/" to="list/:type" params={{type: 'new'}} />
    </Route>
);

Router.run(routes, Handler =>
    React.render(<Handler />, document.getElementById('container'))
);
