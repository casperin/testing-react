import React from 'react';


const Shortcuts = React.createClass({
    render: function () {
        if (!this.props.display) {
            return null;
        }

        return (
            <div className='shortcuts-container'>
                <dl>
                    <dt>Arrow down/up or j/k</dt>
                    <dd>Highlight prev/next registration</dd>
                    <dt>Enter/o</dt>
                    <dd>See details of the registration</dd>
                    <dt>b</dt>
                    <dd>Bill (or Unbill) a registration</dd>
                    <dt>f</dt>
                    <dd>Filter by the current customer</dd>
                    <dt>r</dt>
                    <dd>Reset the filter</dd>
                    <dt>n</dt>
                    <dd>Create new registration</dd>
                    <dt>Esc</dt>
                    <dd>Go to the regitration overview</dd>
                    <dt>?/h</dt>
                    <dd>Open this box</dd>
                </dl>
            </div>
        );
    }
});

export default Shortcuts;

