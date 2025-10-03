import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import { imagePath } from '../utils/imagepath';
type StyleProps = {
  wp: (width: number) => number;
  hp: (height: number) => number;
};
const BookCard = () => {
  const { wp, hp } = useResponsive();
  const styles = makeStyles({ wp, hp });

  return (
    <View style={styles.imageView}>
      <Image
        source={imagePath.krishna}
        style={styles.imageStyle}
        resizeMode="cover"
      />
    </View>
  );
};

const makeStyles = ({ wp, hp }: StyleProps) =>
  StyleSheet.create({
    imageStyle: {
      width: '100%',
      height: '100%',
      borderRadius: 20,
    },
    imageView: {
      overflow: 'hidden',
      // backgroundColor:"red",
      width: wp(40),
      height: wp(60),
      // borderRadius: wp(3),
    },
  });

export default BookCard;
