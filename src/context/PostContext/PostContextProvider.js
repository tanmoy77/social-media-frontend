import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  posts: [],
  isLoading: false,
  error: false,
};

const PostReducer = (state, action) => {
    switch (action.type){
        case 'FETCH_POSTS_REQUEST':
            return {
                ...state,
                isLoading: true
            }
        case 'FETCH_POSTS_SUCCESS':
            return {
                posts: action.payload,
                isLoading: false,
                error: false
            }
        case 'FETCH_POSTS_FAILURE':
            return {
                posts: [],
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const PostContext = createContext(INITIAL_STATE);

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);


  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
