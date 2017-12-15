import axios from './axios';

export function postRegisterForm(payload) {
  console.log('REGISTER_FORM_POST action dispatched');
  return axios.post('/register/', payload).then(function(results) {
    console.log('REGISTER_FORM_POST action results', results);
    const postStatus = results.data.error
    return {type: 'REGISTER_FORM_POST', postStatus}
  })
}

export function postLoginForm(payload) {
  console.log('Login action dispatched');
  return axios.post('/authorize/', payload).then(function(results) {
    console.log('FORM_POST action results', results);
    const postStatus = results.data.error
    return {type: 'FORM_POST', postStatus}
  })
}
