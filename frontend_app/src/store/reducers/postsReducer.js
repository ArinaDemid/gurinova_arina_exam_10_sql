import {
  FETCH_POSTS_SUCCESS,
  VALUE_CHANGE,
  IMAGE_UPLOAD,
  CLEAR_POST,
  FETCH_POST_SUCCESS,
  FETCH_COMMENTS_SUCCESS,
  VALUE_CHANGE_COMMENT,
  CLEAR_COMMENT
} from "../actions/postsActions";

const initialState = {
  posts: [],
  post: {
    title: "",
    content: "",
    datetime: "",
    image: ""
  },
  error: null,
  comments: [],
  comment: {
    author: "",
    comment: ""
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.posts };
    case VALUE_CHANGE:
      return {
        ...state,
        post: {
          ...state.post,
          [action.name]: action.value
        }
      };
    case IMAGE_UPLOAD:
      return {
        ...state,
        post: {
          ...state.post,
          [action.name]: action.file
        }
      };
    case CLEAR_POST:
      return {
        ...state,
        post: {
          title: "",
          content: "",
          datetime: "",
          image: ""
        }
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          title: action.post.title,
          content: action.post.content,
          image: action.post.image,
          datetime: action.post.datetime
        }
      };
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, comments: action.comments };
    case VALUE_CHANGE_COMMENT:
      return {
        ...state,
        comment: {
          ...state.comment,
          [action.name]: action.value
        }
      };
    case CLEAR_COMMENT:
      return { ...state, comment: { author: "", comment: "" } };
    default:
      return state;
  }
};

export default reducer;
