import ArticleList from './ArticleList';
import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state.articleList,
    currentUser: state.common.currentUser,
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    onFollow: username => dispatch({
        type: 'FOLLOW_USER',
        payload: agent.Profile.follow(username)
    }),
    onLoad: payload => dispatch({
        type: 'PROFILE_PAGE_LOADED',
        payload
    }),
    onSetPage: (page, payload) => dispatch({
        type: 'SET_PAGE',
        page,
        payload
    }),
    onUnfollow: username => dispatch({
        type: 'UNFOLLOW_USER',
        payload: agent.Profile.unfollow(username)
    }),
    onUnload: () => dispatch({
        type: 'PROFILE_PAGE_UNLOADED'
    })
});

// TODO BUG: if going to the current user profile via the Header, nothing happens
class Profile extends React.Component {
    componentWillMount() {
        console.log('Profile:componentWillMount');
        this.props.onLoad(Promise.all([
            agent.Profile.get(this.props.params.username),
            agent.Articles.byAuthor(this.props.params.username)
        ]));
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    // written in a separate function so that the inheriting class can override it.
    // has links to the profile favorites view (notice 'nav-link active')
    renderTabs() {
        return (
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <Link className="nav-link active"
                        to={`/@${this.props.profile.username}`}>
                        My Articles
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link"
                        to={`/@${this.props.profile.username}/favorites`}>
                        Favorited Articles
                    </Link>
                </li>
            </ul>
        );
    }

    onSetPage(page) {
        const promise = agent.Articles.byAuthor(this.props.profile.username, page);
        this.props.onSetPage(page, promise);
    }

    render() {
        const profile = this.props.profile;
        if (!profile) {
            return null;
        }

        const isUser = this.props.currentUser &&
            this.props.profile.username === this.props.currentUser.username;

        return (
            <div className="profile-page">

                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">

                                <img src={profile.image} className="user-img" />
                                <h4>{profile.username}</h4>
                                <p>{profile.bio}</p>

                                <EditProfileSettings isUser={isUser} />
                                <FollowUserButton isUser={isUser}
                                    user={profile}
                                    follow={this.props.onFollow}
                                    unfollow={this.props.onUnfollow} />

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <div className="articles-toggle">
                                {this.renderTabs()}
                            </div>

                            <ArticleList articles={this.props.articles}
                                articlesCount={this.props.articlesCount}
                                currentPage={this.props.currentPage}
                                onSetPage={this.onSetPage} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// helper components
const EditProfileSettings = props => {
    if (props.isUser) {
        return (
            <Link to="settings"
                className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-gear-a"></i>&nbsp;Edit Profile settings
            </Link>
        );
    }
    return null;
}

const FollowUserButton = props => {
    if (props.isUser) {
        return null;
    }

    let classes = 'btn btn-sm action-btn';
    // display different button based on if the
    // user is already being followed
    if (props.user.following) {
        classes += 'btn-secondary';
    } else {
        classes += 'btn-outline-secondary';
    }

    const handleClick = event => {
        event.preventDefault()

        if (props.user.following) {
            props.unfollow(props.user.username);
        } else {
            props.follow(props.user.username);
        }
    }

    return (
        <button className={classes}
            onClick={handleClick}>
            <i className="ion-plus-round"></i>
            &nbsp;
            { props.user.following ? 'Unfollow' : 'Follow'}&nbsp;{props.user.username}
        </button>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// so that ProfileFavorites can use it
export { Profile as Profile, mapStateToProps as mapStateToProps };