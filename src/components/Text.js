import React from 'react';
import PropTypes from 'prop-types';
import './text.css';

const SHORTTEXTLENGTH = 320;

const Text = (props) => {
    const shortText = props.text.substr(0, SHORTTEXTLENGTH);
    const fullText = props.text.substr(SHORTTEXTLENGTH);

    const handleReadMore = (e) => {
        const fullText = e.target.parentElement.querySelector('.full');
        fullText.classList.remove('text-hidden');
        e.target.classList.add('btn-hidden');
    }

    return (
        <div className="text">
           <span className="short">{shortText}</span> 
           <button className="btn-read-more" onClick={handleReadMore}>read more</button>
           <span className="full text-hidden">{fullText}</span>
        </div>
    );
}

Text.propTypes = {
    text: PropTypes.string,
};

export default Text;