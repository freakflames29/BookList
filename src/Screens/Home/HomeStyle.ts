import { StyleSheet } from 'react-native';
import FontsVariant from '../../utils/FontsVariant';
import { colors } from '../../utils/colors';
type StyleProps = {
  wp: (width: number) => number;
  hp: (height: number) => number;
};
const makeStyles = ({ wp, hp }: StyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      // paddingRight:wp(5),
    },
    headingContainer: {
      // justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: hp(15),
      // backgroundColor: 'blue',
    },
    text: {
      color: colors.text,
      fontSize: wp(6),
      fontFamily: FontsVariant.UrbanistSemiBold,
    },
    bigText: {
      fontSize: wp(15),
      fontFamily: FontsVariant.UrbanistBlack,
      lineHeight: wp(13),
    },
    rowView:{
      flexDirection:'row',
      gap:wp(3),
      paddingHorizontal:wp(5),
      // justifyContent:'space-between',
    },
    wrapperList:{
      // width:wp(100),
      position:"relative"
    },
    shelf:{
      width:"96%",
      height:wp(21),
      backgroundColor:"rgba(255, 105, 18, 0.7)",
      position:"absolute",
      bottom:-wp(4),
      borderRadius:wp(5),
      alignItems:"center",
      justifyContent:"space-between",
      flexDirection:"row",
      paddingHorizontal:wp(3),
      borderWidth:2,
      borderColor:"rgba(255, 105, 18, 0.7)",
      marginHorizontal:wp(2),
      marginRight:wp(2),
    },
    screwImg:{
      width:wp(5),
      height:wp(5),
      elevation:5,
    }
 
  });

export default makeStyles;
