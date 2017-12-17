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



  if (action.type == 'PICTURE_UPDATED') {
    console.log('reducer got', action.imageDetails);
    let imageNo = action.imageDetails.imageNo
    state = Object.assign({}, state, {
        [imageNo]: action.imageDetails.image
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
