import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchPosts, deletePost } from "../../store/actions/postsActions";
import Post from "../../components/Post/Post";
import "./Posts.css";

class Posts extends Component {
  async componentDidMount() {
    await this.props.fetchPosts();
  }

  render() {
    return (
      <div className="Post">
        <div className="Post_header">
          <h2 style={{ color: "black" }}>Posts</h2>
          <Link to="/news/new">
            <Button variant="dark">Add new post</Button>
          </Link>
        </div>

        <div className="PostsAll">
          {this.props.posts
            .map(post => (
              <Post
                key={post.id}
                id={post.id}
                datetime={post.datetime}
                title={post.title}
                image={post.image}
                deletePost={this.props.deletePost}
              />
            ))
            .reverse()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    deletePost: (event, post) => dispatch(deletePost(event, post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
