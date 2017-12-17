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
  return axios.post('/register/', payload).then(function(results) {
    if (results.data.error) {
      const error = results.data.error
      return {
        type: 'FORM_POST_STATUS',
        error
      }
    } else {
      hashHistory.push('/login')
      return {
        type: 'ALL_GOOD',
        results
      }
    }
  })
}

export function postLoginForm(payload) {
  return axios.post('/authorize', payload).then(function(results) {
    if (results.data.error) {
      const error = results.data.error
      return {
        type: 'FORM_POST_STATUS',
        error
      }
    } else {
      location.replace('/')
      return {
        type: 'ALL_GOOD',
        results
      }
    }
  })
}

export function fetchUserDetails(payload) {
  if (location.pathname != '/landing/') {
    return axios.get('/authorize.json', payload).then(function(results) {
      const userDetails = results.data.userDetails
      return {
        type: 'USERS_DETAILS',
        userDetails
      }
    })
  } else {
    return {
      type: 'ALL_GOOD'
    }
  }
}


export function submitPicture (payload) {
  return axios.post('/uploadImage', payload).then(function(results) {
    console.log(results.data);
    const imageDetails = results.data
    return {
      type: 'PICTURE_UPDATED', imageDetails
    }
  })
}

// export function fetchUserProfile (payload) {
//   return axios.get('/usersProfile.json', payload).then(function(results) {
//     console.log(results.data);
//     const imageDetails = results.data
//     return {
//       type: 'USERS_PROFILE', imageDetails
//     }
//   })
// }
