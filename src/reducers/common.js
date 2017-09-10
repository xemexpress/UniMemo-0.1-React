import {
  APP_NAME,
  STATEMENT,
  APP_LOAD,
  REDIRECT,
  LOGIN,
  REGISTER,
  SAVE_SETTINGS,
  LOGOUT,
  DELETE_REQUEST,
  SUBMIT_REQUEST,
  DELETE_GIFT,
  SUBMIT_GIFT
} from '../constants'

const defaultState = {
  appName: APP_NAME,
  statement: STATEMENT,
  token: null
}

export default (state=defaultState, action) => {
  switch(action.type){
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      }
    case REDIRECT:
      return {
        ...state,
        redirectTo: null
      }
    case REGISTER:
    case LOGIN:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      }
    case SAVE_SETTINGS:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? state.currentUser : action.payload.user
      }
    case LOGOUT:
      return {
        ...state,
        redirectTo: '/',
        currentUser: null,
        token: null
      }
    case DELETE_REQUEST:
      return {
        ...state,
        redirectTo: '/'
      }
    case SUBMIT_REQUEST:
      if(action.error){
        return state
      }
      let redirectRequestURL = `request/${action.payload.request.requestId}`
      return {
        ...state,
        redirectTo: redirectRequestURL
      }
    case DELETE_GIFT:
      return {
        ...state,
        redirectTo: '/'
      }
      case SUBMIT_GIFT:
        if(action.error){
          return {
            ...state
          }
        }
        let redirectGiftURL = `gift/${action.payload.gift.giftId}`
        return {
          ...state,
          redirectTo: redirectGiftURL
        }
    default:
  }
  return state
}
