import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import agent from '../agent';

const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
    appLoaded: state.common.appLoaded
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () => 
        dispatch({ type: 'REDIRECT' }),
    // payload is either a promise to fetch a user, or null (if no token)
    onLoad: (payload, token) =>
        dispatch({ type: 'APP_LOAD', payload, token })
});

class App extends React.Component {
    // when the app loads, try to get the jwt token from the localstorage.
    // if it exists, get the current user to store in the redux state.
    // if not, do nothing
    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        console.log(`APP: componentWillMount ${ token }`);
        if (token) {
            agent.setToken(token);
        }

        // agent.Auth.current() - fetches the currently logged-in user
        this.props.onLoad(token ? agent.Auth.current() : null, token);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log(`APP: componentWillReceiveProps: ${nextProps.redirectTo}`);
        if (nextProps.redirectTo) {
            this.context.router.replace(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    render() {
        if (this.props.appLoaded) {
            return (
                <div>
                    <Header appName={this.props.appName}
                        currentUser={this.props.currentUser} />
                    { this.props.children }
                </div>
            );
        }
        return (
            <div>
                <Header appName={this.props.appName} currentUser={this.props.currentUser} />
                {
                    /* this tells JSX to render the routed child components */ 
                    this.props.children 
                }
            </div>
        );
    }
}

// TODO seems like magic....
App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);