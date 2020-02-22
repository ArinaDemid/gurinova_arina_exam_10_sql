import axiosApi from "../../axiosApi";

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';
export const VALUE_CHANGE = 'VALUE_CHANGE';
export const IMAGE_UPLOAD = 'IMAGE_UPLOAD';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';
export const CLEAR_POST = 'CLEAR_POST';

export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
export const fetchPostsError = (error) => ({type: FETCH_POSTS_ERROR, error});
export const deletePostError = (error) => ({type: DELETE_POST_ERROR, error});
export const valueChange = (name, value) => ({ type: VALUE_CHANGE, name, value });
export const imageUpload = (name, file) => ({ type: IMAGE_UPLOAD, name, file });
export const createPostSuccess = () => ({type: CREATE_POST_SUCCESS});
export const createPostError = (error) => ({type: CREATE_POST_ERROR, error});
export const clearPost = () => ({type: CLEAR_POST});

export const fetchPosts = () => {
  return async dispatch => {
    try {
      const response = await axiosApi.get('/news');
      dispatch(fetchPostsSuccess(response.data));
    } catch(error) {
      dispatch(fetchPostsError(error));
    }
  };
};

export const deletePost = (event, id) => {
  event.preventDefault();
  return async dispatch => {
    try {
      await axiosApi.delete(`/news/${id}`);
      dispatch(fetchPosts());
    } catch(error) {
      dispatch(deletePostError(error));
    }
  };
};

export const onSubmitPost = (event, post) => {
  event.preventDefault();
  return async dispatch => {
    try {
      await axiosApi.post('/news', post);
      dispatch(createPostSuccess());
      dispatch(fetchPosts());
      dispatch(clearPost());
    } catch(error) {
      dispatch(createPostError(error.response.data.error));
    }
  };
};