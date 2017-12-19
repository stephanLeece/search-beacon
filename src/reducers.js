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
    console.log('reducer got', action.userProfile);
    state = Object.assign({}, state, {
      userTitle: action.userProfile.title,
      userDescription: action.userProfile.description,
      userResponsibilites: action.userProfile.responsibilites,
      userSkills: action.userProfile.skills,
      image1: action.userProfile.image1,
      image2: action.userProfile.image2,
      image3: action.userProfile.image3,
      userAddress: action.userProfile.address,
      userLat: action.userProfile.lat,
      userLng: action.userProfile.lng
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


if (action.type == 'ALL_CHARITIES') {
    console.log('reducer got', action.charities);
  if (action.charities.error) {
    state = Object.assign({}, state, {error: action.charities.error });
  } else {
    state = Object.assign({}, state, {
      charities: action.charities,
      error: false
    });
  }
}



  if (action.type == 'PICTURE_UPDATED') {
    console.log('im gonna update', action.imageDetails);
    state = Object.assign({}, state, {
        [action.imageDetails.imageNo]: action.imageDetails.image
    });
  }

  if (action.type == 'PROP_CHANGE') {
    state = Object.assign({}, state, {
        [action.payload.name]: action.payload.value
    });
  }

  if (action.type == 'ADDRESS_UPDATED') {
    console.log('reducer address');
    state = Object.assign({}, state, {
        address: action.payload.address,
        lat: action.payload.lat,
        lng: action.payload.lng,
        addressSaved: true
    });
  }

  return state;

}
