import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (

    <ImageBackground
      source={require('../assets/background_doctor.jpg')}
      resizeMode="cover"
      style={styles.background}
      imageStyle={{ opacity: 0.5 }}
    >

      <View style={styles.container} behavior="padding">
        {children}
      </View>

    </ImageBackground >

  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
