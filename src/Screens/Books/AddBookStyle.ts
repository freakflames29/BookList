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
      flex: 1,
      backgroundColor: colors.background,
      padding: wp(5),
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
      marginVertical: wp(5),
      borderRadius: wp(2),
    },
  });
};

export default makeStyles;
