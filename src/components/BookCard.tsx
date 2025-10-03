import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { imagePath } from '../utils/imagepath';
type StyleProps = {
  wp: (width: number) => number;
  hp: (height: number) => number;
  borderRadius?:number;
};

type BookCardProps = {
  bookImage?:string;
  bookName?:string;
  style?:ViewStyle,
  borderRadius?:number;
}
const BookCard = ({bookImage,bookName,style,borderRadius=20}:BookCardProps) => {
  const { wp, hp } = useResponsive();
  const styles = makeStyles({ wp, hp,borderRadius });

  return (
    <View style={[styles.imageView,style]}>
      {bookImage? 
      <Image
        source={{uri:bookImage}}
        style={styles.imageStyle}
        resizeMode="cover"
      
      />:
      <Image
        source={imagePath.krishna}
        style={styles.imageStyle}
        resizeMode="cover"
      />}
    </View>
  );
};

const makeStyles = ({ wp, hp,borderRadius }: StyleProps) =>
  StyleSheet.create({
    imageStyle: {
      width: '100%',
      height: '100%',
      borderRadius: borderRadius,
    },
    imageView: {
      overflow: 'hidden',
      justifyContent:"center",
      alignItems:"center",
      // backgroundColor:"red",
      width: wp(40),
      height: wp(60),
      // borderRadius: wp(3),
    },
  });

export default BookCard;
