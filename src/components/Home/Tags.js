import React from 'react';
import agent from '../../agent';

const Tags = props => {
    const tags = props.tags;
    if (tags) {
        return (
            <div className="tag-list">
            {
                // Interesting thing going on here.
                // 1. creates individual event handlers for each of the tags
                // 2. at the same time, create the JSX that uses the created
                // event handlers
                //
                // Basically, it sets up the action to return itself during the loop.
                tags.map(tag => {
                    const handleClick = event => {
                        event.preventDefault();
                        props.onClickTag(tag, agent.Articles.byTag(tag));
                    }

                    return (
                        <a href=""
                            className="tag-default tag-pill"
                            key={tag}
                            onClick={handleClick}>
                            {tag}
                        </a>
                    );
                })
            }
            </div>
        );
    } else {
        return (
            <div>Loading Tags...</div>
        );
    }
}

export default Tags;