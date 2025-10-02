import { View, Text } from 'react-native'
import React from 'react'
import makeStyles from './SiginStyle'

const SignIn = () => {

 const styles = makeStyles()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SignIn</Text>
    </View>
  )
}

export default SignIn