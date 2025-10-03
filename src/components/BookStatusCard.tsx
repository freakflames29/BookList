import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import BookCard from './BookCard';
import { BOOK_IMAGE } from '../utils/constants';
import { colors } from '../utils/colors';
import FontsVariant from '../utils/FontsVariant';
type StyleProps = {
  wp: (width: number) => number;
  hp: (height: number) => number;
};

const BookStatusCard = () => {
  const { wp, hp } = useResponsive();
  const styles = makeStyles({ wp, hp });
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '',
        paddingHorizontal: wp(4),
      }}
    >
      <BookCard
        bookImage={BOOK_IMAGE}
        style={{
          width: wp(30),
          height: wp(45),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        borderRadius={10}
      />
      <View style={styles.completedContainer}>
        <Text style={styles.BookcompleteHead}>
          Supreme Personality of Godhead
        </Text>
        <Text style={styles.subtitle}>By Prabhupada</Text>
        <Text style={[styles.bigText, { color: colors.primary }]}>46%</Text>
      </View>
    </View>
  );
};

const makeStyles = ({ wp, hp }: StyleProps) =>
  StyleSheet.create({
    BookcompleteHeading: {
      fontSize: wp(6),
      flexWrap: 'wrap',
    },
    completedContainer: {
      // marginVertical:wp(8),
      paddingLeft: wp(2),
      gap: wp(3),
      width: '90%',
      // backgroundColor:"red",
    },
    subtitle: {
      fontSize: wp(5),
    },
    BookcompleteHead: {
      fontSize: wp(6),
      fontFamily: FontsVariant.UrbanistSemiBold,
    },
    bigText: {
      fontSize: wp(15),
      fontFamily: FontsVariant.UrbanistBlack,
      lineHeight: wp(13),
    },
  });

export default BookStatusCard;
