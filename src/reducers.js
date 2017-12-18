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
  console.log('reducer got', action.otherUserProfile);
  state = Object.assign({}, state, {
    OtherUserFname: action.otherUserProfile.OtherUserFname,
    OtherUserLname: action.otherUserProfile.OtherUserLname,
    OtherUserType: action.otherUserProfile.OtherUserType,
    OtherUserTitle: action.otherUserProfile.OtherUserTitle,
    OtherUserDescription: action.otherUserProfile.OtherUserDescription,
    OtherUserResponsibilites: action.otherUserProfile.OtherUserResponsibilites,
    OtherUserSkills: action.otherUserProfile.OtherUserSkills,
    OtherImage1: action.otherUserProfile.OtherImage1,
    OtherImage2: action.otherUserProfile.OtherImage2,
    OtherImage3: action.otherUserProfile.OtherImage3,
    OtherUserId: action.otherUserProfile.OtherUserId
  });
}

  if (action.type == 'PROFILE_SAVED') {
    state = Object.assign({}, state, {
      profileSaved: true
    });
  }


if (action.type == 'USER_RESULTS') {
    console.log('reducer got', action.userResults);
  if (action.userResults.error) {
    state = Object.assign({}, state, {error: action.userResults.error });
  } else {
    state = Object.assign({}, state, {
      userResults: action.userResults,
      error: false
    });
  }

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

  if (action.type == 'MULTI_PROP_CHANGE') {
    state = Object.assign({}, state, {
        address: action.payload.address,
        lat: action.payload.lat,
        lng: action.payload.lng
    });
  }

  return state;

}
