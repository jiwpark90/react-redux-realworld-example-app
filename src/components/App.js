import Header from './Header';
import Home from './Home';
import React from 'react';
import { connect } from 'react-redux';
import agent from '../agent';

const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => {
    return {
        onRedirect: () => {
            dispatch({ type: 'REDIRECT' });
        },
        onLoad: (payload, token) => {
            dispatch({
                type: 'APP_LOAD',
                payload,
                token
            });
        }
    }
};

class App extends React.Component {
    // WHAT?
    componentWillMount() {
        console.log("APP: componentWillMount");
        const token = window.localStorage.getItem('jwt');
        if (token) {
            agent.setToken(token);
        }

        // agent.Auth.current() - fetches the currently logged-in user
        this.props.onLoad(token ? agent.Auth.current() : null, token);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("APP: componentWillReceiveProps");
        if (nextProps.redirectTo) {
            this.props.router.replace(nextProps.redirectTo);
            this.props.onRedict();
        }
    }

    render() {
        return (
            <div>
                <Header appName={this.props.appName} />
                {
                    /* this tells JSX to render the routed child components */ 
                    this.props.children 
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);