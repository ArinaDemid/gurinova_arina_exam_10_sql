import axiosApi from "../../axiosApi";

export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST_ERROR = "FETCH_POST_ERROR";
export const FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENTS_ERROR = "FETCH_COMMENTS_ERROR";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_ERROR = "CREATE_POST_ERROR";
export const DELETE_POST_ERROR = "DELETE_POST_ERROR";
export const VALUE_CHANGE = "VALUE_CHANGE";
export const IMAGE_UPLOAD = "IMAGE_UPLOAD";

export const VALUE_CHANGE_COMMENT = "VALUE_CHANGE_COMMENT";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_ERROR = "CREATE_COMMENT_ERROR";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_ERROR = "DELETE_COMMENT_ERROR";
export const CLEAR_COMMENT = "CLEAR_COMMENT";
export const CLEAR_POST = "CLEAR_POST";

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts
});
export const fetchPostsError = error => ({ type: FETCH_POSTS_ERROR, error });
export const fetchPostSuccess = post => ({ type: FETCH_POST_SUCCESS, post });
export const fetchPostError = error => ({ type: FETCH_POST_ERROR, error });
export const fetchCommentsSuccess = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  comments
});
export const fetchCommentsError = error => ({
  type: FETCH_COMMENTS_ERROR,
  error
});

export const createPostSuccess = () => ({ type: CREATE_POST_SUCCESS });
export const createPostError = error => ({ type: CREATE_POST_ERROR, error });
export const deletePostError = error => ({ type: DELETE_POST_ERROR, error });
export const valueChange = (name, value) => ({
  type: VALUE_CHANGE,
  name,
  value
});
export const imageUpload = (name, file) => ({ type: IMAGE_UPLOAD, name, file });

export const valueChangeComment = (name, value) => ({
  type: VALUE_CHANGE_COMMENT,
  name,
  value
});
export const createCommentSuccess = () => ({ type: CREATE_COMMENT_SUCCESS });
export const createCommentError = error => ({
  type: CREATE_COMMENT_ERROR,
  error
});
export const deleteCommentSuccess = () => ({ type: DELETE_COMMENT_SUCCESS });
export const deleteCommentError = error => ({
  type: DELETE_COMMENT_ERROR,
  error
});
export const clearComment = () => ({ type: CLEAR_COMMENT });
export const clearPost = () => ({ type: CLEAR_POST });

export const fetchPosts = () => {
  return async dispatch => {
    try {
      const response = await axiosApi.get("/news");
      dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostsError(error));
    }
  };
};

export const fetchPost = id => {
  return async dispatch => {
    try {
      const response = await axiosApi.get(`/news/${id}`);
      dispatch(fetchPostSuccess(response.data));
    } catch (error) {
      dispatch(fetchPostError(error));
    }
  };
};

export const fetchComments = newID => {
  return async dispatch => {
    try {
      const response = await axiosApi.get("/comments?news_id=" + newID);
      dispatch(fetchCommentsSuccess(response.data));
      dispatch(clearComment());
    } catch (error) {
      dispatch(fetchCommentsError(error));
    }
  };
};

export const deletePost = (event, id) => {
  event.preventDefault();
  return async dispatch => {
    try {
      await axiosApi.delete(`/news/${id}`);
      dispatch(fetchPosts());
    } catch (error) {
      dispatch(deletePostError(error));
    }
  };
};

export const deleteComment = (event, id, newID) => {
  event.preventDefault();
  return async dispatch => {
    try {
      await axiosApi.delete(`/comments/${id}`);
      dispatch(deleteCommentSuccess());
      dispatch(fetchComments(newID));
    } catch (error) {
      dispatch(deleteCommentError(error));
    }
  };
};

export const onSubmitPost = (event, post) => {
  event.preventDefault();
  return async dispatch => {
    try {
      await axiosApi.post("/news", post);
      dispatch(createPostSuccess());
      dispatch(fetchPosts());
      dispatch(clearPost());
    } catch (error) {
      dispatch(createPostError(error));
    }
  };
};

export const onSubmitComment = (event, comment, newID) => {
  event.preventDefault();

  return async dispatch => {
    try {
      await axiosApi.post("/comments", comment);
      dispatch(createCommentSuccess());
      dispatch(fetchComments(newID));
    } catch (error) {
      dispatch(createCommentError(error));
    }
  };
};
