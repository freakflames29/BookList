import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import SafePlace from '../../components/SafePlace';
import { useAppSelector } from '../../Adapter/Redux/useAppSelector';
import { useResponsive } from '../../hooks/useResponsive';
import { colors } from '../../utils/colors';
import FontsVariant from '../../utils/FontsVariant';
import AppButton from '../../components/AppButton';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import useFirebaseAuth from '../../hooks/useGoogleAuth';
import { MMKVStorageController } from '../../Adapter/Storage/MMKVStorageController';
import { userActions } from '../../Adapter/Redux/Slices/userSlice';
import { useAppDispatch } from '../../Adapter/Redux/useAppDispatch';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScreenTypes } from '../../Adapter/Navigation/ScreenTypes';
import { BlankSpace } from '../../components/BlankSpace';

const Profile = () => {
  const user = useAppSelector(state => state.userReducer.user);
  const { wp, hp } = useResponsive();
  const { googleSignOut } = useFirebaseAuth();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const logout = () => {
    googleSignOut()
      .then(() => {
        console.log('Logged out');
        MMKVStorageController.CLEAR_ALL();
        dispatch(userActions.removeUser());
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ScreenTypes.SignIn,
              },
            ],
          }),
        );
      })
      .catch(e => {
        console.log('Error while logging out', e);
      });
  };

  return (
    <SafePlace
      style={{
        backgroundColor: colors.background,
      }}
      top
    >
      <View
        style={{
          width: '100%',
          flex: 0.3,
          // backgroundColor:"red",
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: user?.data?.user?.photo || '' }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            fontSize: wp(6),
            fontFamily: FontsVariant.UrbanistBold,
          }}
        >
          {user?.data?.user?.name}
        </Text>
        <Text
          style={{
            fontFamily: FontsVariant.UrbanistSemiBold,
          }}
        >
          {user?.data?.user?.email}
        </Text>
      </View>
      <View style={{
            flex:0.7,
            // backgroundColor:'red'
        }}>
      <View
        style={{
          marginHorizontal: wp(6),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        
        <AppButton
          icon={
            <MaterialIcons name="logout" size={wp(6)} color={colors.text} />
          }
          text="Logout"
          onPress={logout}
        />
        <BlankSpace height={wp(5)} />
        <AppButton
          icon={
            <MaterialIcons name="add" size={wp(6)} color={colors.text} />
          }
          text="Add a book"
          onPress={()=>navigation.navigate(ScreenTypes.Book)}
        />
        </View>
      </View>
    </SafePlace>
  );
};

export default Profile;
