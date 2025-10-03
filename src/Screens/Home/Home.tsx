import { View, Text } from 'react-native';
import React from 'react';
import makeStyles from './HomeStyle';
import { useNavigation, useRoute,RouteProp } from '@react-navigation/native';
import {
  ScreenParamList,
  ScreenTypes,
} from '../../Adapter/Navigation/ScreenTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
};

export default Home;
