import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DiagnosisMemo from '../components/DiagnosisMemo'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
export default function Dashboard({ navigation }) {
  return (


    <ScrollView contentContainerStyle={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <Header>Diagnoza z dnia 2021-11-11</Header>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text>Rodzaj bólu klatki piersiowej: typical angina</Text>
          <Text>Fasting Blood Sugar: yes</Text>
          <Text>Elektokardiograf: Normalny</Text>
          <Text>Ćwiczenia: Tak</Text>
          <Text>Blood Pressure: 100</Text>
          <Text>Cholesterol: 50</Text>
          <Text>Slope: Flat</Text>
          <Text>Thal: Normal</Text>
          <Text>Płeć: Mężczyzna</Text>
          <Text>Wiek: 35 lat</Text>
          <Text>Max Heart Rate: 150</Text>
          <Text>Oldpeak: 23</Text>
          <Text>Major Vessels: 3</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Pozytywne</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
})