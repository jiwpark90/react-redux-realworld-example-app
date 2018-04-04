import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';

const Promise = global.Promise;

const mapStateToProps = (state) => ({
    appName: state.common.appName,
    token: state.common.token
});

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (tab, payload) => {
            dispatch({
                type: 'HOME_PAGE_LOADED',
                tab,
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
        const tab = this.props.token ? 'feed' : 'all';
        const articlesPromise = this.props.token ?
            agent.Articles.feed() :
            agent.Articles.all();

        // TODO what?
        this.props.onLoad(tab, articlesPromise);
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