import {
  FETCH_POSTS_SUCCESS,
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
    default:
      return state;
  }
};

export default reducer;
