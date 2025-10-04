import { View, Text, ImageBackground, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { imagePath } from '../../utils/imagepath';
import { useResponsive } from '../../hooks/useResponsive';
import FontsVariant from '../../utils/FontsVariant';
import { colors } from '../../utils/colors';
import {
  MMKVStorageController,
  PersistanceStorageKey,
} from '../../Adapter/Storage/MMKVStorageController';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScreenTypes } from '../../Adapter/Navigation/ScreenTypes';
import { SignInSuccessResponse } from '@react-native-google-signin/google-signin';
import { useAppDispatch } from '../../Adapter/Redux/useAppDispatch';
import { userActions } from '../../Adapter/Redux/Slices/userSlice';
import  {BlurView} from "@react-native-community/blur"

const Spalsh = () => {
  const { wp, hp } = useResponsive();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const checking = () => {
    try {
      const data = MMKVStorageController.GET_DATA(
        PersistanceStorageKey.USER_INFO,
      );

      if (data?.data) {
        dispatch(userActions.setUser(data));
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
      } else {
        navigation.navigate(ScreenTypes.SignIn);
      }
    } catch (e) {
      console.log('Error fetching mmkv data', e);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      checking();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ImageBackground
      style={{
        flex: 1,
        paddingTop: hp(10),
        // justifyContent:"center",
        alignItems: 'center',
      }}
      source={imagePath.prabhu}
      resizeMode="cover"
      imageStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
    >
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View
        style={{
          height: hp(30),
          marginTop: hp(68),
          backgroundColor: colors.primary,
          width: '100%',
          // justifyContent:"center",
          alignItems: 'cetnter',
          paddingHorizontal:wp(5),
          borderTopLeftRadius: hp(4),
          borderTopRightRadius: hp(4),
        }}
      >
        <Text
          style={{
            marginTop:wp(5),
            fontSize: wp(30),
            fontFamily: FontsVariant.UrbanistBlack,
            color: colors.background,
            lineHeight:wp(29),
            // backgroundColor:'red',
          }}
        >
          Booky
        </Text>
        <Text
          style={{
            fontSize: wp(6),
            fontFamily: FontsVariant.UrbanistRegular,
            color: colors.text,
          }}
        >
          Track your reads smartly
        </Text>

      </View>
    </ImageBackground>
  );
};

export default Spalsh;
