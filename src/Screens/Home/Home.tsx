import { View, Text, Button } from 'react-native';
import React from 'react';
import makeStyles from './HomeStyle';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  ScreenParamList,
  ScreenTypes,
} from '../../Adapter/Navigation/ScreenTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useFirebaseAuth from '../../hooks/useGoogleAuth';
import { useResponsive } from '../../hooks/useResponsive';
import { useAppSelector } from '../../Adapter/Redux/useAppSelector';

// type HomeNavProps = NativeStackNavigationProp<
//   ScreenParamList,
//   ScreenTypes.Home
// >;
// type HomeRouteProp = RouteProp<
//   ScreenParamList,
//   ScreenTypes.Home
// >;

const Home = () => {
  const styles = makeStyles();
  const { googleSignOut } = useFirebaseAuth();
  const user = useAppSelector(state => state.userReducer.user);

  const navigation = useNavigation();
  const logout = () => {
    googleSignOut()
      .then(() => {
        console.log('Logged out');
        navigation.goBack();
      })
      .catch(e => {
        console.log('Error while logging out', e);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user?.data?.user?.name}</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
};

export default Home;
