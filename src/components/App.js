import Header from './Header';
import Home from './Home';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    appName: state.appName
});

class App extends React.Component {
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

// App.contextTypes = {
//     // tells react-routher to attach the 'children' property
//     // to this component's props
//     // TODO how?
//     router: React.PropTypes.object.isRequired
// };

export default connect(mapStateToProps, () => ({}))(App);