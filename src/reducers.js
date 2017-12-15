export default function reducer(state = {}, action) {

  if (action.type == 'FORM_POST') {
    console.log('FORM_POST reducer got', action.postStatus);
    state = Object.assign({}, state, {error: action.postStatus});
  }



  return state;

}

// let n = this.state.status
// switch (action.type) {
//   case '':
//     return 'Add Friend';
//     break;
// }
