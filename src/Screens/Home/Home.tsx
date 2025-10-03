import { View, Text, Button, Image, FlatList } from 'react-native';
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
import SafePlace from '../../components/SafePlace';
import { imagePath } from '../../utils/imagepath';
import BookCard from '../../components/BookCard';

// type HomeNavProps = NativeStackNavigationProp<
//   ScreenParamList,
//   ScreenTypes.Home
// >;
// type HomeRouteProp = RouteProp<
//   ScreenParamList,
//   ScreenTypes.Home
// >;

const Home = () => {
  const { wp, hp } = useResponsive();
  const styles = makeStyles({ wp, hp });
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
    <SafePlace top>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.text}>Your</Text>
          <Text style={[styles.text, styles.bigText]}>BOOKS</Text>
        </View>

        <View style={styles.wrapperList}>
          <FlatList
            data={Array(10).fill(1)}
            horizontal
            contentContainerStyle={styles.rowView}
            renderItem={({ item }) => <BookCard />}
          />
          <View style={styles.shelf}>
            <Image source={imagePath.screw} style={styles.screwImg} />
            <Image source={imagePath.screw} style={styles.screwImg} />
          </View>
        </View>
      </View>
    </SafePlace>
  );
};

export default Home;
