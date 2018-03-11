import Header from './Header';
import Home from './Home';
import React from 'react';
// TODO record
import { connect } from 'react-redux';

// TODO review
const mapStateToProps = state => ({
    appName: state.appName
});

class App extends React.Component {
    render() {
        return (
            <div>
                <Header appName={this.props.appName} />
                <Home />
            </div>
        );
    }
}

// TODO what
export default connect(mapStateToProps, () => ({}))(App);