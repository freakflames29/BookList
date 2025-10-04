import {
  View,
  Text,
  Button,
  Image,
  SectionList,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useRef, useState } from 'react';
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
import useBooks from '../../Adapter/firebase/useBooks';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import FontsVariant from '../../utils/FontsVariant';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
const Home = () => {
  const { wp, hp } = useResponsive();
  const styles = makeStyles({ wp, hp });
  const { googleSignOut } = useFirebaseAuth();
  const user = useAppSelector(state => state.userReducer.user);
  const dispatch = useAppDispatch();
  const { books, loading, updateBook } = useBooks();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [bookId, setBookId] = useState<string>('');
  const navigation = useNavigation<any>();
  const [currentPage, setCurrentPage] = useState<string>();
  const [totalPages, setTotalPages] = useState<string>();
  const [updateBookLoading, setUpdateBookLoading] = useState<boolean>(false);

  // ✅ Precompute numbers outside of worklet
  const bigFontSize = wp(15);
  const smallFontSize = wp(9);
  const bigSubFont = wp(4);
  const smallSubFont = wp(3);
  const bigHeading = hp(15);
  const smallHeading = hp(5);

  // shared values
  const fontSize = useSharedValue(bigFontSize);
  const subFontSize = useSharedValue(bigSubFont);
  const headingHeight = useSharedValue(bigHeading);
  const lastOffset = useSharedValue(0);

  // scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const y = event.contentOffset.y;

      if (y > 0) {
        // scroll up
        fontSize.value = withTiming(smallFontSize, { duration: 200 });
        subFontSize.value = withTiming(smallSubFont, { duration: 200 });
        headingHeight.value = withTiming(smallHeading, { duration: 200 });
      } else {
        // scroll down
        fontSize.value = withTiming(bigFontSize, { duration: 200 });
        subFontSize.value = withTiming(bigSubFont, { duration: 200 });
        headingHeight.value = withTiming(bigHeading, { duration: 200 });
      }

      lastOffset.value = y;
    },
  });

  // animated styles
  const headingStyle = useAnimatedStyle(() => ({
    height: headingHeight.value,
  }));

  const bigTextStyle = useAnimatedStyle(() => ({
    fontSize: fontSize.value,
  }));

  const smallTextStyle = useAnimatedStyle(() => ({
    fontSize: subFontSize.value,
  }));

  const updateBookHandler = () => {
    console.log('The book id>>>', bookId);
    console.log('The book Page>>>', parseInt(currentPage));
    setUpdateBookLoading(true);
    updateBook(bookId, { currentPage: parseInt(currentPage) })
      .then(res => {
        console.log('The book updated successfully>>>', res);
      })
      .catch(e => {
        console.log('Error updating book>>>', e);
      })
      .finally(() => {
        setUpdateBookLoading(false);
        actionSheetRef.current?.hide();
      });
  };

  return (
    <SafePlace top>
      <ActionSheet ref={actionSheetRef}>
        <View
          style={{
            height: hp(30),
            width: '100%',
            padding: wp(8),
            position: 'relative',
          }}
        >
          <View
            style={{
              width: wp(29),
              height: wp(29),
              borderRadius: wp(50),
              backgroundColor: colors.primary,
              position: 'absolute',
              top: -wp(15),
              right: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: wp(3),
                fontFamily: FontsVariant.UrbanistSemiBold,
                color: colors.text,
              }}
            >
              Total Pages
            </Text>
            <Text
              style={{
                fontSize: wp(5),
                fontFamily: FontsVariant.UrbanistSemiBold,
                color: colors.text,
              }}
            >
              {totalPages}
            </Text>
          </View>

          <Text
            style={{
              fontSize: wp(5),
              fontFamily: FontsVariant.UrbanistSemiBold,
              color: colors.text,
            }}
          >
            Where are you now ?
          </Text>
          <TextInput
            value={currentPage}
            keyboardType="number-pad"
            onChangeText={setCurrentPage}
            placeholder="Current Page"
            placeholderTextColor={colors.text}
            style={{
              width: '100%',
              backgroundColor: colors.cream,
              color: colors.text,
              padding: wp(5),
              marginTop: wp(5),
              borderRadius: wp(2),
            }}
          />
          <BlankSpace height={hp(5)} />
          <TouchableOpacity
            disabled={updateBookLoading}
            style={{
              width: '100%',
              height: hp(6),
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp(100),
            }}
            onPress={updateBookHandler}
          >
            {updateBookLoading ? (
              <ActivityIndicator size={wp(5)} color={colors.text} />
            ) : (
              <Text
                style={{
                  fontSize: wp(5),
                  fontFamily: FontsVariant.UrbanistSemiBold,
                }}
              >
                Update
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ActionSheet>

      <View style={styles.nav}>
        <MaterialIcons name="search" size={wp(8)} color={colors.text} />
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenTypes.Profile)}
        >
          <MaterialIcons
            name="account-circle"
            size={wp(8)}
            color={colors.text}
          />
        </TouchableOpacity>
        {/* <Text>Hello</Text> */}
      </View>

      <View style={styles.container}>
        <Animated.View style={[styles.headingContainer, headingStyle]}>
          <Animated.Text style={[styles.text, smallTextStyle]}>
            Your
          </Animated.Text>
          <Animated.Text style={[styles.text, styles.bigText, bigTextStyle]}>
            Books
          </Animated.Text>
        </Animated.View>

        <BlankSpace height={hp(5)} />
        <Animated.FlatList
          onScroll={scrollHandler}
          data={books || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <BookStatusCard
                bookName={item?.title}
                author={item?.author}
                currentPage={item?.currentPage}
                totalPages={item?.totalPages}
                status={item?.status}
                bookImage={item?.image}
                onPress={() => {
                  setBookId(item?.id || '');
                  setTotalPages(item?.totalPages.toString() || '1');
                  setCurrentPage(item?.currentPage.toString() || '1');
                  actionSheetRef.current?.show();
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <BlankSpace height={wp(4)} />}
          contentContainerStyle={styles.colviewFlatlist}
        />
      </View>
    </SafePlace>
  );
};

export default Home;

// <View style={styles.wrapperList}>
//               <SectionList
//                 sections={[{ title: '', data: item }]}
//                 horizontal
//                 contentContainerStyle={styles.rowView}
//                 renderItem={() => <BookCard bookImage={BOOK_IMAGE} />}
//               />
//               <View style={styles.shelf}>
//                 <Image source={imagePath.screw} style={styles.screwImg} />
//                 <Image source={imagePath.screw} style={styles.screwImg} />
//               </View>
//             </View>
