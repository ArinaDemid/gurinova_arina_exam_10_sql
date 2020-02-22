import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Input, Label } from "reactstrap";
import { Button, Col, Form, FormGroup } from "react-bootstrap";
import {
  fetchPost,
  fetchComments,
  deleteComment,
  valueChangeComment,
  onSubmitComment
} from "../../store/actions/postsActions";
import GetComment from "../../components/GetComment/GetComment";
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";
import "./Show_post.css";

class Show_post extends Component {
  async componentDidMount() {
    await this.props.fetchPost(this.props.match.params.id);
    await this.props.fetchComments(this.props.match.params.id);
  }

  render() {
    let commentForPost = {
      author: this.props.comment.author,
      comment: this.props.comment.comment,
      newId: this.props.match.params.id
    };
    return (
      <Fragment>
        <div className="Post">
          <h3>{this.props.post.title}</h3>
          <Moment format="DD-MM-YYYY hh:mm:ss" className="GetPost_date">
            {this.props.post.datetime}
          </Moment>
          <p>{this.props.post.content}</p>
          <ProductThumbnail image={this.props.post.image} />
        </div>
        <h3>Comments</h3>

        {this.props.comments.length !== 0 ? (
          <div className="CommentsAll">
            {this.props.comments.map(comment => (
              <GetComment
                key={comment.id}
                id={comment.id}
                new_ID={this.props.match.params.id}
                author={comment.author}
                comment={comment.comment}
                deleteComment={this.props.deleteComment}
              />
            ))}
          </div>
        ) : (
          <div className="CommentsAll">
            <h4>Do not comments</h4>
          </div>
        )}

        <div className="New_comment">
          <h2>Add comment</h2>
          <Form
            onSubmit={event =>
              this.props.onSubmitComment(
                event,
                commentForPost,
                this.props.match.params.id
              )
            }
            style={{ width: "600px" }}
          >
            <FormGroup>
              <Label sm={2} for="author">
                Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Enter name"
                  onChange={event =>
                    this.props.valueChangeComment(
                      event.target.name,
                      event.target.value
                    )
                  }
                  value={this.props.comment.author}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Label sm={2} for="comment">
                Comment
              </Label>
              <Col sm={10}>
                <Input
                  required
                  type="textarea"
                  name="comment"
                  id="comment"
                  placeholder="Enter comment"
                  onChange={event =>
                    this.props.valueChangeComment(
                      event.target.name,
                      event.target.value
                    )
                  }
                  value={this.props.comment.comment}
                />
              </Col>
            </FormGroup>

            <FormGroup style={{ paddingBottom: "30px" }}>
              <Col sm={{ offset: 2, size: 10 }}>
                <Button type="submit" variant="dark">
                  Save
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts.post,
    comments: state.posts.comments,
    comment: state.posts.comment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: id => dispatch(fetchPost(id)),
    fetchComments: newID => dispatch(fetchComments(newID)),
    deleteComment: (event, id, new_ID) =>
      dispatch(deleteComment(event, id, new_ID)),
    valueChangeComment: (event, value) =>
      dispatch(valueChangeComment(event, value)),
    onSubmitComment: (event, comment, new_ID) =>
      dispatch(onSubmitComment(event, comment, new_ID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Show_post);
