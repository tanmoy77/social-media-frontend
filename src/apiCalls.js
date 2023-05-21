import API from './axios';

export const loginCall = async (userCredentials, dispatch, navigate) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await API.post(`/auth/login`, userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    navigate('/');
  } catch (err) { 
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const fetchPosts = async (dispatch) => {
  dispatch({type: "FETCH_POSTS_REQUEST"});
  try{
    const {data} = await API.get('/posts/timeline');
    dispatch({type: 'FETCH_POSTS_SUCCESS', payload: data})
  } catch(err) {
    dispatch({type: "FETCH_POSTS_FAILURE", payload: err})
  }
}

export const fetchComments = async (postId, dispatch) => {
  dispatch({ type: 'FETCH_COMMENTS_REQUEST'});
  try {
    const {data} = await API.get(`/comments/${postId}`);
    dispatch({type: "FETCH_POSTS_SUCCESS", payload: data});
  } catch(err) {
    dispatch({type: "FETCH_COMMENTS_FAILURE", payload: err})
  }
}

export const fetchProfilePosts = async (dispatch, userId) => {
  dispatch({type: 'FETCH_POSTS_REQUEST'});
  try{
    const {data} = await API.get(`/posts/profile/${userId}`);
    dispatch({type: 'FETCH_POSTS_SUCCESS', payload: data})
  } catch(err) {
    dispatch({type: "FETCH_POSTS_FAILURE", payload: err})
  }
}