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

type BookStatusCardProps = {
  bookName?:string;
  bookImage?:string;
  currentPage?:number;
  totalPages?:number;
  status?:string;
  author?:string
}

const BookStatusCard : React.FC<BookStatusCardProps> = (props) => {
  const { wp, hp } = useResponsive();
  const styles = makeStyles({ wp, hp });
  const percents = props?.currentPage && props?.totalPages ? props?.currentPage / props?.totalPages * 100 : 0;
  console.log("The Book Image>>>",props?.bookImage)
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
        bookImage={props?.bookImage}
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
         { props?.bookName || "Supreme Personality of Godhead"}
        </Text>
        <Text style={styles.subtitle}>By {  props?.author || "Prabhupada"}</Text>
        <Text style={[styles.bigText, { color: colors.primary }]}>{percents.toFixed(0)}%</Text>
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
      fontSize: wp(4),
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
