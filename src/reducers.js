export default function reducer(state = {}, action) {

  if (action.type == 'REGISTER_FORM_POST') {
    console.log('REGISTER_FORM_POST reducer got', action.payload);
  }



  return state;

}

// let n = this.state.status
// switch (action.type) {
//   case '':
//     return 'Add Friend';
//     break;
// }
