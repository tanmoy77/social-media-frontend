const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "ADD_FRIEND_TO_FRIENDLIST":
      return {
        ...state,
        user: {
          ...state.user,
          details: {
            ...state.user.details,
            friends: [...state.user.details.friends, action.payload]
          },
        },
      };

    case "UNFRIEND":
      return {
        ...state,
        user: {
          ...state.user,
          details: {
            ...state.user.details,
            friends: state?.user?.details.friends?.filter(
              (uId) => uId !== action.payload
            ),
          }
        },
      };
    
    case "UPLOAD_PROFILE_PIC":
      return {
        ...state,
        user: {
          ...state.user,
          details: {
            ...state?.user?.details,
            profilePicture: action.payload
          }
        }
      }

    default:
      return state;
  }
};

export default AuthReducer;
