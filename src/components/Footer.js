import React from 'react';
//import PropTypes from 'prop-types';
import './footer.css';

const Footer = (props) => {
    return (
        <footer >
            Images: <a href="https://unsplash.com/" 
                target="_blank"
                rel="noopener noreferrer">unsplash.com</a>
        </footer>
    );
}

// Author.propTypes = {
//     name: PropTypes.string,
//     avatar: PropTypes.string,
//     bio: PropTypes.string,
// };

export default Footer;