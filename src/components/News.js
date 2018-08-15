import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import loader from '../images/loading.svg';
import Author from './Author';
import Image from './Image';
import { isNear } from '../helpers';
import './news.css';

const newsChunk = 3; 	// how many news to load at a single request
class News extends Component {

	constructor(props) {
		super(props);

		this.btnRef = React.createRef();
		this.loaderRef = React.createRef();
		this.newsFetchURL = process.env.REACT_APP_NEWSFETCHURL; 

		this.state = {
			start: 0,
			newsShowed: [],
			newsToShow: [],
			isLoading: false,
			canLoadMore: true,
			showLoader: false,
			loadMoreClicked: false,
		};
	}

	loadNewsChunk = (printAfterLoad = true) => {
		this.setState({isLoading: true});

		fetch(`${this.newsFetchURL}?start=${this.state.start}&count=${newsChunk}`)
			.then(data => data.json())
			.then(data => {
				if (printAfterLoad || this.state.loadMoreClicked){
					const news = Array.from(this.state.newsShowed);
					news.push(...data);
					this.setState({newsShowed: news,
						start: this.state.start+data.length,
						isLoading: false,
						showLoader: false,
						canLoadMore: data.length === newsChunk,
						loadMoreClicked: false,
					});
				}
				else{
					const news = Array.from(this.state.newsToShow);
					news.push(...data);
					this.setState({newsToShow: news,
						start: this.state.start+data.length,
						isLoading: false,
						showLoader: false,
					});
				}
				
				})
			.catch(err => console.log(err));
	}

	handleLoadMore = (e) => {
		this.setState({showLoader: true});

		// if the news chunk is being loaded:
		if (this.state.newsToShow.length === 0 && this.state.isLoading){
			this.setState({loadMoreClicked: true});
			return;
		}
	
		// if news chunk hasn't been loaded yet and is not being loaded now
		if (this.state.newsToShow.length === 0 && !this.state.isLoading){
			this.loadNewsChunk();
			return;
		}
		
		const news = Array.from(this.state.newsShowed);
		news.push(...this.state.newsToShow);
		this.setState({newsShowed: news });
		this.setState({newsToShow: [] });
		this.setState({canLoadMore: this.state.newsToShow.length === newsChunk});
		this.setState({showLoader: false});
	}

	handleMouseMove = (e) => {
		const button = ReactDOM.findDOMNode(this.btnRef.current);

		if (!button) return;

		if (isNear(button, e.nativeEvent, 200)){
			if (this.state.newsToShow.length === 0 && !this.state.isLoading && this.state.canLoadMore){
				this.loadNewsChunk(false);
			}
		}
	}

	componentDidMount(){
		this.loadNewsChunk();
	}

	render() {
		const options = { month: 'long', day: 'numeric', year: 'numeric' };
		let date;
		return (
			<div className="news"
				 onMouseMove={this.handleMouseMove}>
				<h1>News</h1>
				<ul>
					{this.state.newsShowed.map((item, i) => 
						{
							date = new Date(Date.parse(item.dateCreated));
							return(
								<li key={`k${i}`}>
									<article>
										
										<p className="date">{date.toLocaleDateString('en-US', options)}</p>
										<h3>{item.title}</h3>
										<Image images={item.images}
											   alt={item.title}/>
										<p>{item.text}</p>
										<Author name={item.authorName} 
												avatar={item.authorAvatar}
												bio={item.authorBio}/>
									</article>
								</li>
							)
						})
					}
				</ul>
				<div className="btnDiv">
					{
						(this.state.showLoader && this.state.isLoading) || this.state.newsShowed.length === 0
						? <img src={loader} className="loader" alt="Please wait..." />
						: null
					}

					{
						this.state.newsShowed.length > 0
						? <button
							ref={this.btnRef}
							onClick={this.handleLoadMore}
							className="btn-load-more"
							disabled={!this.state.canLoadMore}>Load more</button>
						: null
					}
				</div>
				
			</div>
		);
	}
}

export default News;
