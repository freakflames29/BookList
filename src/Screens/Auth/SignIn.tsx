import { View, Text, Image } from 'react-native';
import React from 'react';
import makeStyles from './SiginStyle';
import { useResponsive } from '../../hooks/useResponsive';
import SafePlace from '../../components/SafePlace';
import { imagePath } from '../../utils/imagepath';

const SignIn = () => {
  const { wp, hp } = useResponsive();

  const styles = makeStyles({ wp, hp });

  return (
    <SafePlace top>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome To Booky</Text>
        <Text style={styles.smallText}>Smart way to track your reads</Text>

        <View style={styles.imageView}>
          <Image
            source={imagePath.signin}
            style={styles.image}
          />
        </View>

        
      </View>
    </SafePlace>
  );
};

export default SignIn;
