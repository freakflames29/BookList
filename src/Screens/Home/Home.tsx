import { View, Text, Button, Image, SectionList } from 'react-native';
import React from 'react';
import makeStyles from './HomeStyle';
import { CommonActions, useNavigation } from '@react-navigation/native';
import useFirebaseAuth from '../../hooks/useGoogleAuth';
import { useResponsive } from '../../hooks/useResponsive';
import { useAppSelector } from '../../Adapter/Redux/useAppSelector';
import SafePlace from '../../components/SafePlace';
import { imagePath } from '../../utils/imagepath';
import BookCard from '../../components/BookCard';
import { BOOK_IMAGE } from '../../utils/constants';
import { BlankSpace } from '../../components/BlankSpace';
import { colors } from '../../utils/colors';
import BookStatusCard from '../../components/BookStatusCard';
import { ScreenTypes } from '../../Adapter/Navigation/ScreenTypes';
import { MMKVStorageController } from '../../Adapter/Storage/MMKVStorageController';
import { useAppDispatch } from '../../Adapter/Redux/useAppDispatch';
import { userActions } from '../../Adapter/Redux/Slices/userSlice';

const Home = () => {
  const { wp, hp } = useResponsive();
  const styles = makeStyles({ wp, hp });
  const { googleSignOut } = useFirebaseAuth();
  const user = useAppSelector(state => state.userReducer.user);
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

  // 🔹 Sectioned Data
  const sections = [
    {
      title: 'New Hot Books',
      data: [Array(10).fill(1)], // keep inside array to render one row
    },
    {
      title: 'Your Books',
      data: Array(10).fill(1),
    },
  ];

  return (
    <SafePlace top>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.text}>Your</Text>
          <Text style={[styles.text, styles.bigText]}>Books</Text>
          {/* <Button title="logut" onPress={logout} /> */}
        </View>

        <SectionList
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ paddingVertical: hp(2) }}>
              <Text style={[styles.text, { marginLeft: wp(5) }]}>{title}</Text>
            </View>
          )}
          renderItem={({ item, section }) => {
            if (section.title === 'New Hot Books') {
              // 🔹 First Section: horizontal books
              return (
                <View style={styles.wrapperList}>
                  <SectionList
                    sections={[{ title: '', data: item }]}
                    horizontal
                    contentContainerStyle={styles.rowView}
                    renderItem={() => <BookCard bookImage={BOOK_IMAGE} />}
                  />
                  <View style={styles.shelf}>
                    <Image source={imagePath.screw} style={styles.screwImg} />
                    <Image source={imagePath.screw} style={styles.screwImg} />
                  </View>
                </View>
              );
            } else {
              // 🔹 Second Section: grid books
              return <BookStatusCard />;
            }
          }}
          // numColumns={2}
          // columnWrapperStyle={{
          // justifyContent: 'space-evenly',
          // }}
          ItemSeparatorComponent={() => <BlankSpace height={wp(4)} />}
          contentContainerStyle={styles.colviewFlatlist}
        />
      </View>
    </SafePlace>
  );
};

export default Home;
