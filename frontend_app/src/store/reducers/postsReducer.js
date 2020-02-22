import {
  FETCH_POSTS_SUCCESS,
  VALUE_CHANGE,
  IMAGE_UPLOAD,
  CLEAR_POST
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
    default:
      return state;
  }
};

export default reducer;
