import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DiagnosisMemo from '../components/DiagnosisMemo'
import Header from '../components/Header'
const data1 = {
  isSick: true,
  pulse: 100,
  choles: 50,
  something1: 25,
  something2: 25,
  date: '2021-10-10'
}
const data2 = {
  isSick: false,
  pulse: 100,
  choles: 50,
  something1: 25,
  something2: 25,
  date: '2021-11-11'
}

export default function Dashboard({ navigation }) {
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Header>Historia wyników</Header>
      <DiagnosisMemo data={data1}></DiagnosisMemo>
      <DiagnosisMemo data={data2}></DiagnosisMemo>
      <DiagnosisMemo data={data2}></DiagnosisMemo>
      <DiagnosisMemo data={data2}></DiagnosisMemo>
      <DiagnosisMemo data={data2}></DiagnosisMemo>
      <DiagnosisMemo data={data2}></DiagnosisMemo>
      <DiagnosisMemo data={data2}></DiagnosisMemo>
      <DiagnosisMemo data={data2}></DiagnosisMemo>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})