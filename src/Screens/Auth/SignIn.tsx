import { View, Text, Image, Alert } from 'react-native';
import React, { useEffect } from 'react';
import makeStyles from './SiginStyle';
import { useResponsive } from '../../hooks/useResponsive';
import SafePlace from '../../components/SafePlace';
import { imagePath } from '../../utils/imagepath';
import AppButton from '../../components/AppButton';
import { BlankSpace } from '../../components/BlankSpace';
// import { googleSigin, googleSignOut } from '../../utils/googleLogin';
import useFirebaseAuth from '../../hooks/useGoogleAuth';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScreenTypes } from '../../Adapter/Navigation/ScreenTypes';
import { useAppDispatch } from '../../Adapter/Redux/useAppDispatch';
import { userActions } from '../../Adapter/Redux/Slices/userSlice';
import {
  MMKVStorageController,
  PersistanceStorageKey,
} from '../../Adapter/Storage/MMKVStorageController';
import LottieView from 'lottie-react-native';
const SignIn = () => {
  const { wp, hp } = useResponsive();

  const { googleSigin, googleSignOut, loading, user } = useFirebaseAuth();
  const navigation = useNavigation<any>();
  const styles = makeStyles({ wp, hp });
  const dispatch = useAppDispatch();
  const siginHandler = () => {
    googleSigin()
      .then(res => {
        dispatch(userActions.setUser(res));
        MMKVStorageController.SET_DATA(PersistanceStorageKey.USER_INFO, res);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: ScreenTypes.Home,
              },
            ],
          }),
        );
      })
      .catch(e => {
        console.log('Error', e);
      });
  };

  return (
    <SafePlace top>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome To Booky</Text>
        <Text style={styles.smallText}>Smart way to track your reads</Text>

        <View style={styles.imageView}>
          <LottieView
            source={imagePath.booklottie2}
            autoPlay
            loop
            style={styles.image}
          />
          {/* <Image source={imagePath.signin} style={styles.image} /> */}
        </View>
        <BlankSpace height={hp(10)} />
        <AppButton
          text="Continue with Google"
          showGoogle
          onPress={() => siginHandler()}
        />
      </View>
    </SafePlace>
  );
};

export default SignIn;
