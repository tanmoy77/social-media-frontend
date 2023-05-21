import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  comments: [],
  isLoading: false,
  error: false,
};

const PostReducer = (state, action) => {
    switch (action.type){
        case 'FETCH_COMMENTS_REQUEST':
            return {
                ...state,
                isLoading: true
            }
        case 'FETCH_COMMENTS_SUCCESS':
            return {
                comments: action.payload,
                isLoading: false,
                error: false
            }
        case 'FETCH_COMMENTS_FAILURE':
            return {
                comments: [],
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const CommentContext = createContext();

export const CommnetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);


  return (
    <CommentContext.Provider
      value={{
        comments: state.comments,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
