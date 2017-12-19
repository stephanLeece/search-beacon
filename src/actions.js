import axios from './axios';
import {
  Router,
  Route,
  Link,
  IndexRoute,
  redirect,
  hashHistory,
  browserHistory
} from 'react-router';

export function postRegisterForm(payload) {
  return axios.post('/register', payload).then(function(results) {
    if (results.data.error) {
      const error = results.data.error
      return {type: 'FORM_POST_STATUS', error}
    } else {
      hashHistory.push('/login')
      return {type: 'ALL_GOOD', results}
    }
  })
}

export function postLoginForm(payload) {
  return axios.post('/authorize', payload).then(function(results) {
    if (results.data.error) {
      const error = results.data.error
      return {type: 'FORM_POST_STATUS', error}
    } else {
      location.replace('/')
      return {type: 'ALL_GOOD', results}
    }
  })
}

export function fetchUserDetails(payload) {
  if (location.pathname != '/landing/') {
    return axios.get('/authorize.json', payload).then(function(results) {
      const userDetails = results.data.userDetails
      return {type: 'USERS_DETAILS', userDetails}
    })
  } else {
    return {type: 'ALL_GOOD'}
  }
}



export function submitPicture(payload) {
  return axios.post('/uploadImage', payload).then(function(results) {
    const imageDetails = results.data
    return {type: 'PICTURE_UPDATED', imageDetails}
  })
}

export function submitAddress(payload) {
  console.log('address action', payload);
  return axios.post('/saveAddress', payload).then(function(results) {
    return {type: 'ADDRESS_UPDATED', payload}
  })
}

export function saveProfile(payload) {
  return axios.post('/saveProfile', payload).then(function(results) {
    if (results.data.error) {
      const error = results.data.error
      return {type: 'FORM_POST_STATUS', error}
    } else {
      return {type: 'PROFILE_SAVED', payload}
    }
  })
}

export function fetchUserProfile(payload) {
  return axios.get('/userProfile.json', payload).then(function(results) {
    console.log('action fetched', results);
    const userProfile = results.data.userProfile
    return {type: 'USER_PROFILE', userProfile}
  })
}

export function fetchOtherUserProfile(payload) {
  return axios.get('/otherUserProfile.json' + payload).then(function(results) {
    if (results.data.redirect) {
      location.replace('/')
      return {type: 'ALL_GOOD', results}
    } else {
      const otherUserProfile = results.data
      return {type: 'OTHER_USER_PROFILE', otherUserProfile}
    }
  })
}

export function searchUsers(payload) {
  console.log('got search request', payload);
  return axios.post('/search.json', payload).then(function(results) {
    if (results.data.redirect) {
      location.replace('/')
      return {type: 'ALL_GOOD', results}
    } else {
      const userResults = results.data
      return {type: 'USER_RESULTS', userResults}
    }
  })
}

export function propChange(payload) {
  return {type: 'PROP_CHANGE', payload}
}

export function multiPropChange(payload) {
  return {type: 'PROP_CHANGE', payload}
}
