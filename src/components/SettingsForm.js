import React from 'react';

// this class has internal state
class SettingsForm extends React.Component {
    constructor() {
        super();

        // initial state
        this.state = {
            image: '',
            username: '',
            bio: '',
            email: '',
            password: '',
        };

        // whenever form changes, update the component's state entirely
        this.updateState = field => event => {
            const state = this.state;
            const newState = Object.assign({}, state, { [field]: event.target.value });
            this.setState(newState);
        };

        this.submitForm = event => {
            event.preventDefault();

            // copy information from component's current state
            const user = Object.assign({}, this.state);
            if (!user.password) {
                delete user.password;
            }

            this.props.onSubmitForm(user);
        };
    }

    componentWillMount() {
        if (this.props.currentUser) {
            Object.assign(this.state, {
                image: this.props.currentUser.image || '',
                username: this.props.currentUser.username,
                bio: this.props.currentUser.bio || '',
                email: this.props.currentUser.email
            });
        }
    }

    // TODO when would you ever come here? user shouldn't change.
    // if it does, it would be for logging out
    componentWillReceiveProps(nextProps) {
        console.log(`componentWillReceiveProps??`);
        console.log(nextProps);
        if (nextProps.currentUser) {
            this.setState(Object.assign({}, this.state, {
                image: nextProps.currentUser.image || '',
                username: nextProps.currentUser.username,
                bio: nextProps.currentUser.bio || '',
                email: nextProps.currentUser.email
            }));
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="URL of profile picture"
                            value={this.state.image}
                            onChange={this.updateState('image')} />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.updateState('username')} />
                    </fieldset>

                    <fieldset className="form-group">
                        <textarea
                        className="form-control form-control-lg"
                        rows="8"
                        placeholder="Short bio about you"
                        value={this.state.bio}
                        onChange={this.updateState('bio')}>
                        </textarea>
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.updateState('email')} />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="New Password"
                        value={this.state.password}
                        onChange={this.updateState('password')} />
                    </fieldset>

                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={this.state.inProgress}>
                        Update Settings
                    </button>
                    
                </fieldset>
            </form>
        );
    }
}

export default SettingsForm;