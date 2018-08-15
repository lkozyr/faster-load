import React from 'react';
import PropTypes from 'prop-types';
import './author.css';

const Author = (props) => {
    return (
        <div className="author">
            <span>Written by </span>
            
            <span className="name">
                <span className="name-short">{props.name}</span>

                <div className="details">
                    <img src={props.avatar} alt={props.name} />
                    <span className="name">{props.name}</span>
                    <p className="bio">{props.bio}</p>
                </div>
            </span>
        </div>
    );
}

Author.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    bio: PropTypes.string,
};

export default Author;