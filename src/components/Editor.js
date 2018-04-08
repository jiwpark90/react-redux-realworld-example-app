import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state.editor
});

const mapDispatchToProps = dispatch => ({
    onAddTag: () =>
        dispatch({ type: 'ADD_TAG' }),
    onLoad: payload =>
        dispatch({ type: 'EDITOR_PAGE_LOADED', payload }),
    onRemoveTag: tag =>
        dispatch({ type: 'REMOVE_TAG', tag }),
    onSubmit: payload =>
        dispatch({ type: 'ARTICLE_SUBMITTED', payload }),
    onUnload: () =>
        dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
    onUpdateField: (key, value) =>
        dispatch({ type: 'UPDATE_FIELD_EDITOR', key, value })
});

class Editor extends React.Component {
    constructor() {
        super();

        const updateFieldEvent = key => event =>
            this.props.onUpdateField(key, event.target.value);
        this.changeTitle = updateFieldEvent('title');
        this.changeDescription = updateFieldEvent('description');
        this.changeBody = updateFieldEvent('body');
        this.changeTagInput = updateFieldEvent('tagInput');

        // TODO responds to keyboard events
        this.watcherForEnter = event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                this.props.onAddTag();
            }
        };

        // given a tag, return a function that dispatches
        // an event to remove the tag
        // TODO is this a network call each time, which means
        // if the network is down, doesn't respond?
        this.removeTagHandler = tag => () => {
            this.props.onRemoveTag(tag);
        }

        this.submitForm = event => {
            event.preventDefault();
            const article = {
                title: this.props.title,
                description: this.props.description,
                body: this.props.body,
                tagList: this.props.tagList
            };

            // look at slug to determine whether it is a new article or existing
            const slug = { slug: this.props.articleSlug };
            const promise = this.props.articleSlug ?
                agent.Articles.update(Object.assign(article, slug)) :
                agent.Articles.create(article);

            this.props.onSubmit(promise);
        }
    }
    
    // react-router reuses the component if two routes have the SAME COMPONENT.
    // e.g. if /editor & /editor/slug both use the Editor component won't recreate
    // if you navigate to '/editor' from '/editor/slug'.
    // TO GET AROUND THIS PROBLEM, use 'componentWillReceiveProps()'
    componentWillReceiveProps(nextProps) {
        if (this.props.params.slug !== nextProps.params.slug) {
            this.loadSlug(nextProps.params.slug);
        }
    }

    componentWillMount() {
        this.loadSlug(this.props.params.slug);
    }

    loadSlug(slug) {
        if (slug) {
            return this.props.onLoad(agent.Articles.get(slug));
        }
        this.props.onLoad(null);
    }

    render() {
        return (
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <ListErrors errors={this.props.errors}></ListErrors>

                            <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Article Title"
                                            value={this.props.value}
                                            onChange={this.changeTitle} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg"
                                            type="text"
                                            placeholder="What's this article about?"
                                            value={this.props.description}
                                            onChange={this.changeDescription} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <textarea className="form-control"
                                            rows="8"
                                            placeholder="Write your article (in markdown)"
                                            value={this.props.body}
                                            onChange={this.changeBody} />
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <input className="form-control"
                                            type="text"
                                            placeholder="Enter tags"
                                            value={this.props.tagInput}
                                            onChange={this.changeTagInput}
                                            onKeyUp={this.watcherForEnter} />

                                        <div className="tag-list">
                                            {
                                                (this.props.tagList || []).map(tag => {
                                                    return (
                                                        <span className="tag-default tag-pill"
                                                            key={tag}>
                                                            <i className="ion-close-round"
                                                                onClick={this.removeTagHandler(tag)}>
                                                            </i>
                                                            {tag}
                                                        </span>
                                                    );
                                                })
                                            }
                                        </div>
                                    </fieldset>

                                    <button className="btn btn-lg pull-xs-right btn-primary"
                                        type="button"
                                        disabled={this.props.inProgress}
                                        onClick={this.submitForm}>
                                        Publish Article
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);