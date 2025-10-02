import { StyleSheet } from 'react-native';
import FontsVariant from '../../utils/FontsVariant';

const makeStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'red',
      fontSize: 40,
      fontFamily: FontsVariant.UrbanistBlack,
    },
  });

export default makeStyles;
