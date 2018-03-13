import Header from './Header';
import Home from './Home';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    appName: state.common.appName,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => {
    return {
        onRedirect: () => {
            dispatch({ type: 'REDIRECT' });
        }
    }
};

class App extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            // TODO check this out
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