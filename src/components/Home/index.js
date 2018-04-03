import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

const Promise = global.Promise;

const mapStateToProps = (state) => ({
    appName: state.common.appName
});

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (payload) => {
            dispatch({
                type: 'HOME_PAGE_LOADED',
                payload
            });
        },
        onUnload: () => {
            dispatch({
                type: 'HOME_PAGE_UNLOADED'
            });
        }
    };
};

class Home extends React.Component {
    componentWillMount() {
        this.props.onLoad(agent.Articles.all());
    }

    componentWillUnmount() {
        this.props.onUnload();
    }
    
    render() {
        return (
            <div className="home-page">
                <Banner appName={this.props.appName} />
                <div className="container page">
                    {/* TODO what is the purpose of this? perhaps CSS */}
                    <div className="row">
                        <MainView />

                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>Popular Tags</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);