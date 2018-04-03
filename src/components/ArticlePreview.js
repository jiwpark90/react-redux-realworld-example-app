import React from 'react';
import { Link } from 'react-router';

const ArticlePreview = (props) => {
    const article = props.article;
    return (
        <div className="article-preview">
            {/* info about the author */}
            <div className="article-meta">
                {/* WTF does the '@' do?? */}
                <Link to={`@${ article.author.username }`}>
                    {
                        article.author.image && 
                            <img src={article.author.image} />
                    }
                </Link>
                

                <div className="info">
                    <Link className="author" to={`@${article.author.username}`}>
                        { article.author.username }
                    </Link>
                    <span className="date">
                        { new Date(article.createdAt).toDateString() }
                    </span>
                </div>

                <div className="pull-xs-right">
                    <button className="btn btn-sm btn-outline-primary">
                        <i className="ion-heart"></i>
                        { article.favoritesCount }
                    </button>
                </div>
            </div>

            {/* article info */}
            <Link to={`article/${article.slug}`} 
                className="preview-link">
                <h1>{ article.title }</h1>
                <p>{ article.description }</p>
                <span>Read more...</span>
                <ul className="tag-list">
                    {
                        article.tagList.map((tag) => {
                            return (
                                <li className="tag-default tag-pill tag-outline" key={tag}>
                                    {tag}
                                </li>
                            )
                        })
                    }
                </ul>
            </Link>
        </div>
    );
};

export default ArticlePreview;