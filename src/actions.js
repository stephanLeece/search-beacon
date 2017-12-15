import axios from './axios';

export function postForm(payload) {
  console.log('REGISTER_FORM_POST action dispatched');
  return axios.post('/register/', payload).then(function() {
    return {type: 'REGISTER_FORM_POST', payload}
  })
}
