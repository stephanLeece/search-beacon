export default function reducer(state = {}, action) {

  if (action.type == 'FORM_POST_STATUS') {

    state = Object.assign({}, state, {error: action.error});
  }

  if (action.type == 'USERS_DETAILS') {

    state = Object.assign({}, state, {
      loggedInUserEmail: action.userDetails.email,
      loggedInUserFname: action.userDetails.fname,
      loggedInUserId: action.userDetails.id,
      loggedInUserLname: action.userDetails.lname,
      loggedInUsertype: action.userDetails.usertype
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
