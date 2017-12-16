export default function reducer(state = {}, action) {

  if (action.type == 'FORM_POST_FAIL') {
    console.log('FORM_POST reducer got', action.error);
    state = Object.assign({}, state, {error: action.error});
  }

  if (action.type == 'FORM_POST_SUCCESS') {
    console.log('FORM_POST reducer got', action.userDetails);
    state = Object.assign({}, state, {
      loggedInUserEmail: action.userDetails.email,
      loggedInUserFname: action.userDetails.fname,
      loggedInUserId: action.userDetails.id,
      loggedInUserLname: action.userDetails.lname,
      loggedInUserUsertype: action.userDetails.usertype
    });
  }

  return state;

}

// let n = this.state.status
// switch (action.type) {
//   case '':
//     return 'Add Friend';
//     break;
// }
