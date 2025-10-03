import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '50073338887-rl8qd5fm4irjq69vkv4o5h319agbmse2.apps.googleusercontent.com',
});

const googleSigin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const res = await GoogleSignin.signIn();
    if (isSuccessResponse(res)) {
      console.log(res);
      return res
    } else {
      console.log('User cancelled google sigin ');
    }
  } catch (e) {
    if (isErrorWithCode(e)) {
      switch (e.code) {
        case statusCodes.IN_PROGRESS:
          console.log('User is already signed in');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('Play services not available');
          break;
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('Error while signing in');
          break;
        default:
          console.log('Unknown error', e);
      }
    }
  }
};

const googleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (e) {
    console.log('Error while signing out', e);
  }
};
export { googleSigin, googleSignOut };