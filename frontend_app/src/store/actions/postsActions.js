import axiosApi from "../../axiosApi";

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';


export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
export const fetchPostsError = (error) => ({type: FETCH_POSTS_ERROR, error});
export const deletePostError = (error) => ({type: DELETE_POST_ERROR, error});

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
