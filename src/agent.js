import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

import {
  API_ROOT,
  PER_PAGE
} from './constants/refs'

const superagent = superagentPromise(_superagent, global.Promise)

const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if(token){
    req.set('Authorization', `Token ${token}`)
  }
}

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
}

const Auth = {
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  current: () =>
    requests.get('/user'),
  save: user =>
    requests.put('/user', { user })
}

const Profile = {
  get: username =>
    requests.get(`/profiles/${username}`),
  favor: username =>
    requests.post(`/profiles/${username}/favor`),
  unfavor: username =>
    requests.del(`/profiles/${username}/favor`)
}

const limit = (count, page=0) => `limit=${count}&offset=${page * count}`
const omitUnitId = unit => {
  if(unit.requestId){
    return Object.assign(unit, { requestId: undefined })
  }else{
    return Object.assign(unit, { giftId: undefined })
  }
}

const Requests = {
  all: page =>
  // testing purpose:
  // requests.get(`/requests?${limit(PER_PAGE, page)}`),
    requests.get(`/requests?tag=ongoing&${limit(PER_PAGE, page)}`),
  collect: page =>
    requests.get(`/requests/collect?tag=ongoing&${limit(PER_PAGE, page)}`),
  furtherCollect: page =>
    requests.get(`/requests/furtherCollect?tag=ongoing&${limit(PER_PAGE, page)}`),
  taking: page =>
    requests.get(`/requests/taking?tag=ongoing&${limit(PER_PAGE, page)}`),
  byTag: (tag, page) =>
    requests.get(`/requests?tag=ongoing,${tag}&${limit(PER_PAGE, page)}`),
  postedBy: (username, page) =>
    requests.get(`/requests?not_this_tag=done&poster=${username}&${limit(PER_PAGE, page)}`),
  helpedBy: (username, page) =>
    requests.get(`/requests?tag=ongoing-taken&helper=${username}&${limit(PER_PAGE, page)}`),
  wishedBy: (username, page) =>
    requests.get(`/requests?wisher=${username}&${limit(PER_PAGE, page)}`),
  get: requestId =>
    requests.get(`/requests/${requestId}`),
  update: request =>
    requests.put(`/requests/${request.requestId}`, { request: omitUnitId(request) }),
  create: request =>
    requests.post('/requests', { request }),
  del: requestId =>
    requests.del(`/requests/${requestId}`),
  wish: requestId =>
    requests.post(`/requests/${requestId}/wish`),
  unwish: requestId =>
    requests.del(`/requests/${requestId}/wish`),
  take: requestId =>
    requests.post(`/requests/${requestId}/take`),
  untake: requestId =>
    requests.del(`/requests/${requestId}/take`),
  listHelpers: (requestId, page) =>
    requests.get(`/requests/${requestId}/confirms?${limit(PER_PAGE, page)}`),
  confirmHelper: (requestId, username) =>
    requests.put(`/requests/${requestId}/confirms/${username}`),
  end: (requestId, mem) =>
    requests.put(`/requests/${requestId}/ends/${mem}`)
}

const Gifts = {
  byTag: (tag, page) =>
    requests.get(`/user/gifts?tag=${tag}&${limit(PER_PAGE, page)}`),
  providedBy: (username, using, page) =>
    requests.get(`/user/gifts?provider=${username}&using=${using}&${limit(PER_PAGE, page)}`),
  receivedBy: (username, using, page) =>
    requests.get(`/user/gifts?receiver=${username}&using=${using}&${limit(PER_PAGE, page)}`),
  get: giftId =>
    requests.get(`/user/gifts/${giftId}`),
  del: giftId =>
    requests.del(`/user/gifts/${giftId}`),
  create: gift =>
    requests.post('/user/gifts', { gift }),
  update: gift =>
    requests.put(`/user/gifts/${gift.giftId}`, { gift: omitUnitId(gift) }),
  switch: giftId =>
    requests.get(`/user/gifts/${giftId}/switch`)
}

const Comments = {
  forRequest: requestId =>
    requests.get(`/requests/${requestId}/comments`),
  create: (requestId, comment) =>
    requests.post(`/requests/${requestId}/comments`, { comment }),
  update: (requestId, commentId, comment) =>
    requests.put(`/requests/${requestId}/comments/${commentId}`, { comment }),
  delete: (requestId, commentId) =>
    requests.del(`/requests/${requestId}/comments/${commentId}`)
}

const Tags = {
  getRequests: () =>
    requests.get('/tags?tag=requests'),
  getGifts: () =>
    requests.get('/tags?tag=gifts')
}

export default {
  Auth,
  Profile,
  Requests,
  Gifts,
  Comments,
  Tags,
  setToken: _token => { token = _token }
}
