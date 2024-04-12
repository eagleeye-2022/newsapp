import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
      country: 'in',
      pageSize: 8,
      category: 'general'
    }
    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }

    constructor (){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5bb951e9fb08414d99a33970651ab076&page=1&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      })
    }

    handlePrevChange =async ()=> {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5bb951e9fb08414d99a33970651ab076&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })
    }

    handleNextChange = async ()=> {

      if(!(this.state.page + 1 > Math.ceil(this.state.articlestotalResults/this.props.pageSize))) {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5bb951e9fb08414d99a33970651ab076&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
        })
      }
    }

  render() {
    return (
      <div  className="container my-3">
        <h1 className='text-center' style={{ margin: "35px 0px"}}>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevChange}>&larr; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextChange}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
