import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './image.css';


class Image extends React.Component {

    constructor(props) {
        super(props);
		this.imgRef = React.createRef();
    }
    
    loadFullSizeImage = (imgElement) => {
        if (imgElement.offsetTop > window.scrollY && 
            imgElement.offsetTop + imgElement.height * 0.5 < window.scrollY + window.innerHeight){
                imgElement.classList.add('unblur');
                imgElement.src = imgElement.dataset['large'];
            }
    }

    handleScroll = () => {
        const img = ReactDOM.findDOMNode(this.imgRef.current);
        this.loadFullSizeImage(img);
        // if (img.offsetTop > window.scrollY && 
        //     img.offsetTop + img.height * 0.5 < window.scrollY + window.innerHeight){
        //         img.classList.add('unblur');
        //         img.src = img.dataset['large'];
        //     }
    }
    
    imageLoaded = (e) => {
        this.loadFullSizeImage(e.target);
        // if (e.target.offsetTop > window.scrollY && 
        //     e.target.offsetTop + e.target.height * 0.5 < window.scrollY + window.innerHeight){
        //         e.target.classList.add('unblur');
        //         e.target.src = e.target.dataset['large'];
        //     }
        window.addEventListener('scroll', this.handleScroll);
    }

    render(){
        if (!this.props.images) return null;

        const src = this.props.images.split(',')[0];
        const large = this.props.images.split(',')[1] || src;
        return (
            <div className="image">    
                <img 
                    src={src} 
                    alt={this.props.alt} 
                    data-large={large} 
                    ref={this.imgRef} 
                    className="img"
                    onLoad={this.imageLoaded}/>
            </div>
        );
    }
}
    
Image.propTypes = {
    images: PropTypes.string,
    alt: PropTypes.string,
};

export default Image;