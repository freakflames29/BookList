import { StyleSheet } from 'react-native';
import FontsVariant from '../../utils/FontsVariant';
import { colors } from '../../utils/colors';
import { useResponsive } from '../../hooks/useResponsive';
type StyleProps = {
  wp: (width: number) => number;
  hp: (height: number) => number;
};
const makeStyles = () => {
  const { wp, hp } = useResponsive();

  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      padding: wp(5),
      paddingBottom:hp(8),
      // marginBottom:hp(5),
      // justifyContent:'center',
    },
    headingText: {
      fontFamily: FontsVariant.UrbanistSemiBold,
      fontSize: wp(10),
      color: colors.text,
    },
    textBoxStyle: {
      width: '100%',
      backgroundColor: colors.cream,
      color: colors.text,
      padding: wp(5),
      height: wp(15),
      marginTop: wp(5),
      borderRadius: wp(2),
    },
    errorText:{
        color:'red',
        margin:wp(1)
    }
  });
};

export default makeStyles;
