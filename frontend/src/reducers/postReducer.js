import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  ADD_POST_SUCCESS,
  ADD_COMMENT_SUCCESS,
} from "./constants";

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
        posts: action.payload,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? { ...post, comments: action.payload.comments }
            : post
        ),
      };
  }
}
