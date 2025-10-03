import { View, Text, ViewStyle, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useResponsive } from '../hooks/useResponsive';
import FontsVariant from '../utils/FontsVariant';
import { colors } from '../utils/colors';
import Icon from '@react-native-vector-icons/fontawesome';
type StyleProps = {
  wp: (width: number) => number;
  hp: (height: number) => number;
};
type AppButtonProps = {
  style?: ViewStyle;
  text?: string;
  onPress?: () => void;
};

const AppButton: React.FC<AppButtonProps> = props => {
  const { wp, hp } = useResponsive();
  const styles = makeStyles({ wp, hp });
  return (
    <Pressable style={[styles.container, props.style]} onPress={props.onPress}>
      <Icon name="google" size={wp(5)} color={colors.text} />
      <Text style={styles.text}>{props.text}</Text>
      {/* <View style={styles.roundCircle}>
      <Icon name="arrow-circle-o-right" size={wp(5)} color={colors.primary} />

      </View> */}
    </Pressable>
  );
};

const makeStyles = ({ wp, hp }: StyleProps) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: hp(8),
      backgroundColor: colors.primary,
      borderRadius: hp(199),
      paddingHorizontal: wp(5),
      //   paddingVertical:wp(2),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: wp(3),
      position: 'relative',
    },
    text: {
      color: colors.text,
      fontSize: wp(5),
      fontFamily: FontsVariant.UrbanistBold,
    //   marginRight: wp(5),
    },
    roundCircle: {
      position: 'absolute',
      right: wp(3),
      width: wp(12),
      height: wp(12),
      borderRadius: wp(50),
      marginLeft: wp(3),
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default AppButton;
