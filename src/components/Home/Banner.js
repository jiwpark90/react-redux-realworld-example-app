import React from 'react';

// Stateless Functional Component
const Banner = ({ appName }) => {
    return (
        <div className="banner">
            /* what is the purpose of a container inside banner? */
            <div className="container">
                <h1 className="logo-font">
                    { appName.toLowerCase() }
                </h1>
                <p>A place to share your knowledge</p>
            </div>
        </div>
    );
};

export default Banner;