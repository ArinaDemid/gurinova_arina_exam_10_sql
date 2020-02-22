import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./GetComment.css";

class GetComment extends Component {
  render() {
    return (
      <div className="GetComment">
        <div className="GetComment_text">
          <p className="GetComment_author">{this.props.author}</p>
          <p className="GetComment_comment">wrote: {this.props.comment}</p>
        </div>
        <Button
          onClick={event =>
            this.props.deleteComment(event, this.props.id, this.props.new_ID)
          }
          variant="link"
        >
          Delete
        </Button>
      </div>
    );
  }
}

export default GetComment;
