import React from "react";

const NewsItem = (props)=> {
  let { title, description, imageUrl, newsUrl, author, date, source} = props;

  return (
    <div className="my-3">
      <div className="card">
        <div>
          <span className="badge rounded-pill bg-danger" style={{ display: 'flex', position: "absolute", right:'0'}} >
            {source}
          </span>
        </div>
        <img src={!imageUrl?"https://images.moneycontrol.com/static-mcnews/2023/04/Collage-Maker-14-Apr-2023-12-26-PM-3953-1-770x433.jpg":imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-danger">By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
