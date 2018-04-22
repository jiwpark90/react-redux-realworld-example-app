import ListErrors from './ListErrors';
import React from 'react';
// import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
import SettingsForm from './SettingsForm'

const mapStateToProps = state => ({
    ...state.settings,
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    // TODO see how this will be handled
    // GUESS:
    // 1. this class does the logic to log the user out
    // 2. call this method to transition
    onClickLogout: () => 
        dispatch({ type: 'LOGOUT' }),
    onSubmitForm: user =>
        dispatch({ type: 'SETTINGS_SAVED', payload: agent.Auth.save(user) })
});

class Settings extends React.Component {
    render() {
        console.log("PROPS");
        console.log(this.props);
        return (
            <div className="settings-page">
                <div className="container-page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your Settings</h1>
                            
                            <ListErrors errors={ this.props.errors }></ListErrors>

                            <SettingsForm
                                currentUser={ this.props.currentUser }
                                onSubmitForm={ this.props.onSubmitForm }
                                inProgress={ this.props.inProgress }/>

                            <hr />

                            <button
                                className="btn btn-outline-danger"
                                onClick={ this.props.onClickLogout }>
                                Or click here to logout.
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);