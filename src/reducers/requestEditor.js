import {
  REQUEST_EDITOR_LOADED,
  UPDATE_FIELD_REQUEST,
  REQUEST_EDITOR_UNLOADED,
  ADD_TAG_REQUEST,
  REMOVE_TAG_REQUEST,
  ASYNC_START,
  SUBMIT_REQUEST
} from '../constants/actionTypes'

const defaultState = {
  startTime: '',
  startPlace: '',
  endTime: '',
  endPlace: '',
  text: '',
  image: '',
  requestId: undefined,
  tagInput: '',
  tagList: ['ongoing']
}

export default (state=defaultState, action) => {
  switch(action.type){
    case REQUEST_EDITOR_LOADED:
      return {
        ...state,
        requestId: action.payload.request.requestId,
        startTime: action.payload.request.startTime ? new Date(action.payload.request.startTime).toISOString().slice(0,16) : '',
        startPlace: action.payload.request.startPlace || '',
        endTime: new Date(action.payload.request.endTime).toISOString().slice(0,16),
        endPlace: action.payload.request.endPlace,
        text: action.payload.request.text,
        image: action.payload.request.image || '',
        tagInput: '',
        tagList: action.payload.request.tagList
      }
    case REQUEST_EDITOR_UNLOADED:
      return defaultState
    case UPDATE_FIELD_REQUEST:
      return {
        ...state,
        [action.key]: action.value
      }
    case ADD_TAG_REQUEST:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      }
    case REMOVE_TAG_REQUEST:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      }
    case ASYNC_START:
      if(action.subtype === SUBMIT_REQUEST){
        return {
          ...state,
          inProgress: true
        }
      }
      break
    case SUBMIT_REQUEST:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }
    default:
  }
  return state
}
