import { StyleSheet } from 'react-native';
import FontsVariant from '../../utils/FontsVariant';
import { colors } from '../../utils/colors';

type Props = {
  wp: (width: number) => number;
  hp: (height: number) => number;
};

const makeStyles = ({ wp, hp }: Props ) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding:wp(5),
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
      fontSize: wp(13),
      fontFamily: FontsVariant.UrbanistBold,
      lineHeight: wp(15),
      marginBottom: wp(3),
    },
    smallText:{
      color: colors.text,
      fontSize: wp(5),
      fontFamily: FontsVariant.UrbanistRegular,
    },
    imageView:{
      marginTop:hp(6),
      width:"100%",
      height:wp(100),
      justifyContent:"center",
      alignItems:"center",
    },
    image:{
      width:"100%",
      height:"100%",
    }
  });

export default makeStyles;
