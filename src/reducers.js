export default function reducer(state = {}, action) {

  if (action.type == 'FORM_POST_STATUS') {

    state = Object.assign({}, state, {error: action.error});
  }

  if (action.type == 'USERS_DETAILS') {

    state = Object.assign({}, state, {
      userEmail: action.userDetails.email,
      userFname: action.userDetails.fname,
      userId: action.userDetails.id,
      userLname: action.userDetails.lname,
      userType: action.userDetails.usertype
    });
  }

  if (action.type == 'USER_PROFILE') {
    state = Object.assign({}, state, {
      userTitle: action.userProfile.title,
      userDescription: action.userProfile.description,
      userResponsibilites: action.userProfile.responsibilites,
      userSkills: action.userProfile.skills,
      userImage1: action.userProfile.image1,
      userImage2: action.userProfile.image2,
      userImage3: action.userProfile.image3
    });
  }



if (action.type == 'OTHER_USER_PROFILE') {
  state = Object.assign({}, state, {
    OtherUserFname: action.otherUserProfile.fname,
    OtherUserLname: action.otherUserProfile.lname,
    OtherUserType: action.otherUserProfile.usertype,
    OtherUserTitle: action.otherUserProfile.title,
    OtherUserDescription: action.otherUserProfile.description,
    OtherUserResponsibilites: action.otherUserProfile.responsibilites,
    OtherUserSkills: action.otherUserProfile.skills,
    OtherImage1: action.otherUserProfile.image1,
    OtherImage2: action.otherUserProfile.image2,
    OtherImage3: action.otherUserProfile.image3,
    OtherUserId: action.otherUserProfile.userid
  });
}

  if (action.type == 'PROFILE_SAVED') {
    state = Object.assign({}, state, {
      profileSaved: true
    });
  }




  if (action.type == 'PICTURE_UPDATED') {
    let imageNo = action.imageDetails.imageNo
    state = Object.assign({}, state, {
        [imageNo]: action.imageDetails.image
    });
  }

  if (action.type == 'PROP_CHANGE') {
    state = Object.assign({}, state, {
        [action.payload.name]: action.payload.value
    });
  }

  return state;

}
