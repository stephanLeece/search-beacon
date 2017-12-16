import axios from './axios';

export function postRegisterForm(payload) {
  console.log('FORM_POST_FAIL action dispatched');
  return axios.post('/register/', payload).then(function(results) {
  const error = results.data.error
      return {type: 'FORM_POST_FAIL', error}

  })
}

export function postLoginForm(payload) {
  console.log('Login action dispatched');
  return axios.post('/authorize/', payload).then(function(results) {
    console.log('FORM_POST action results', results);
    if (results.data.error) {  const error = results.data.error
      return {type: 'FORM_POST_FAIL', error}
    }
    else {
      const userDetails = results.data.userDetails
      return {type: 'FORM_POST_SUCCESS', userDetails}
    }

  })
}
