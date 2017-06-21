import {
  REQUEST_PAGE_LOADED,
  REQUEST_PAGE_UNLOADED,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  TAKE_REQUEST,
  UNTAKE_REQUEST,
  HELPER_LOADED,
  CONFIRM_HELPER,
  END_REQUEST
} from '../constants/actionTypes'

export default (state={}, action) => {
  switch(action.type){
    case REQUEST_PAGE_LOADED:
      return {
        ...state,
        request: action.error ? null : action.payload[0].request,
        comments: action.error ? null : action.payload[1].comments
      }
    case HELPER_LOADED:
      return {
        ...state,
        helpers: action.error ? null : action.payload.helpers
      }
    case CONFIRM_HELPER:
      return {
        ...state,
        request: action.error ? null : action.payload.request
      }
    case REQUEST_PAGE_UNLOADED:
      return {}
    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ? null :
          (state.comments || []).concat([action.payload.comment])
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        updateErrors: action.error ? action.payload.errors : null,
        comments: action.error ? null :
          state.comments.map(comment => {
            if(action.payload.comment.id === comment.id){
              return {
                ...comment,
                body: action.payload.comment.body
              }
            }
            return comment
          })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => action.commentId !== comment.id)
      }
    case TAKE_REQUEST:
    case UNTAKE_REQUEST:
      return {
        ...state,
        request: action.payload.request
      }
    case END_REQUEST:
      return {
        ...state,
        memErrors: action.error ? action.payload.errors : null,
        request: action.error ? state.request : action.payload.request
      }
    default:
  }
  return state
}
