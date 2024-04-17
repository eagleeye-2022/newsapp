import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

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

    Capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    constructor (props){
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.Capitalize(this.props.category)} - NewsMonkey`
    }

    async updateNews() {
      this.props.setProgress(0);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bb951e9fb08414d99a33970651ab076&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      })
      this.props.setProgress(100);
    }
    async componentDidMount() {
      this.updateNews();
    }

    handlePrevChange =async ()=> {
      this.updateNews();
      this.setState ({
        page: this.state.page - 1
      })
    }

    handleNextChange = async ()=> {
      this.updateNews();
      this.setState ({
        page: this.state.page + 1
      })
      
    }

    fetchMoreData = async () => {
      this.setState({
        page: this.state.page + 1,
      })
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5bb951e9fb08414d99a33970651ab076&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      })
    };

  render() {
    return (
      <> 
        <h1 className='text-center' style={{ margin: "35px 0px"}}>NewsMonkey - Top {this.Capitalize(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          >
          <div  className="container my-3">
            <div className="row">
              {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                    <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}
                    author={element.author?element.author:"Unknown:"} date={element.publishedAt} source={element.source.name}/>
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
