import ArticleList from '../ArticleList';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    articles: state.articles
});

const MainView = (props) => {
    return (
        <div className="col-md-9">
            {/* TODO guessing this is the filter */}
            <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                        <a href="" className="nav-link active">
                        Global feed
                        </a>
                    </li>
                </ul>
            </div>
            <ArticleList articles={ props.articles } />
        </div>
    );
};

export default connect(mapStateToProps, () => ({}))(MainView);