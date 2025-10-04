import { View, Text } from 'react-native';
import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import FontsVariant from '../utils/FontsVariant';
import LottieView from 'lottie-react-native';
import { imagePath } from '../utils/imagepath';
import AppButton from './AppButton';
import { useNavigation } from '@react-navigation/native';
import { ScreenTypes } from '../Adapter/Navigation/ScreenTypes';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { colors } from '../utils/colors';

const NoBooks = () => {
  const { wp, hp } = useResponsive();
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: hp(40),
        width: '100%',
        // backgroundColor:"red",
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LottieView
        source={imagePath.booklottie}
        autoPlay
        loop
        style={{
          width: wp(50),
          height: wp(50),
          //   marginBottom: wp(5),
        }}
      />
      <Text
        style={{
          fontSize: wp(6),
          fontFamily: FontsVariant.UrbanistBold,
        }}
      >
        No Books Added Yet
      </Text>
      <Text
        style={{
          marginTop: wp(2),
          fontSize: wp(5),
          fontFamily: FontsVariant.UrbanistRegular,
        }}
      >
        Add some books to get started
      </Text>

      <AppButton
        style={{
          marginTop: hp(2),
          width: '80%',
        }}
        text="Add Book"
        icon={<MaterialIcons name="add" size={wp(5)} color={colors.text} />}
        onPress={() => navigation.navigate(ScreenTypes.Book)}
      />
    </View>
  );
};

export default NoBooks;
