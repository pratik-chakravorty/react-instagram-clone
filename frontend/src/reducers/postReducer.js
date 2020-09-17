import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  TOGGLE_LIKE_SUCCESS,
  ADD_POST_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  TOGGLE_SAVE_SUCCESS,
} from "../actions/constants";

const initialState = {
  post: {},
  posts: [],
  loading: false,
};

export default function postReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case FETCH_POST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case FETCH_POSTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.data,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.post
            ? {
                ...post,
                commentsCount: post.commentsCount + 1,
                comments: post.comments.concat(action.payload),
              }
            : post
        ),
      };
    case TOGGLE_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
      };

    default:
      return state;
  }
}
