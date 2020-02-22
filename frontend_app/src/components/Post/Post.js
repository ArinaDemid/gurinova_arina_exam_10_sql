import React, { Component } from "react";
import Moment from "react-moment";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductThumbnail from "../ProductThumbnail/ProductThumbnail";

class Post extends Component {
  render() {
    return (
      <div className="Post">
        <ProductThumbnail image={this.props.image} />
        <div>
          <p className="Post_title">{this.props.title}</p>
          <Moment format="DD-MM-YYYY hh:mm:ss" className="Post_date">
            {this.props.datetime}
          </Moment>
        </div>
        <Link to={`/news/${this.props.id}`}>Read Full Post >> </Link>
        <Button
          onClick={event => this.props.deletePost(event, this.props.id)}
          variant="link"
        >
          Delete
        </Button>
      </div>
    );
  }
}

export default Post;
