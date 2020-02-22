import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Label } from "reactstrap";
import { Button, Col, Form, FormGroup } from "react-bootstrap";
import {
  imageUpload,
  valueChange,
  onSubmitPost
} from "../../store/actions/postsActions";

class AddPost extends Component {
  createPost = (event, formData) => {
    this.props.onSubmitPost(event, formData).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    const formData = new FormData();

    Object.keys(this.props.post).forEach(key => {
      formData.append(key, this.props.post[key]);
    });

    return (
      <div className="New_new">
        <h2>Add new post</h2>
        <Form
          onSubmit={event => this.createPost(event, formData)}
          style={{ width: "600px" }}
        >
          <FormGroup>
            <Label sm={2} for="authorName">
              Title
            </Label>
            <Col sm={10}>
              <Input
                required
                type="text"
                name="title"
                id="title"
                placeholder="Enter title"
                onChange={event =>
                  this.props.valueChange(event.target.name, event.target.value)
                }
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Label sm={2} for="message">
              Content
            </Label>
            <Col sm={10}>
              <Input
                required
                type="textarea"
                name="content"
                id="content"
                placeholder="Enter content"
                onChange={event =>
                  this.props.valueChange(event.target.name, event.target.value)
                }
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Label sm={2} for="image">
              Image
            </Label>
            <Col sm={10}>
              <Input
                placeholder="Choose file"
                type="file"
                name="image"
                id="image"
                onChange={event =>
                  this.props.imageUpload(
                    event.target.name,
                    event.target.files[0]
                  )
                }
                className="file"
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
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts.post
  };
};

const mapDispatchToProps = dispatch => {
  return {
    valueChange: (name, value) => dispatch(valueChange(name, value)),
    imageUpload: (name, file) => dispatch(imageUpload(name, file)),
    onSubmitPost: (event, post) => dispatch(onSubmitPost(event, post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
