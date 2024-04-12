import React, { Component } from "react";

export class NewsItem extends Component {



  render() {
    let { title, description, imageUrl, newsUrl} = this.props;

    return (
      <div className="my-3">
        <div className="card">
          <img src={!imageUrl?"https://images.moneycontrol.com/static-mcnews/2023/04/Collage-Maker-14-Apr-2023-12-26-PM-3953-1-770x433.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;