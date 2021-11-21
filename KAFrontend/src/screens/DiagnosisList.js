import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
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
  useEffect(() => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
      }
    }
    xhr.open('GET', 'http://192.168.1.57:5000/api/survey/data?username=' + global.login, true);
    xhr.send();
    console.log("loaded");
  });
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Header>Historia wyników</Header>
      <DiagnosisMemo data={data1} navigation={navigation}></DiagnosisMemo>
      <DiagnosisMemo data={data2} navigation={navigation}></DiagnosisMemo>
      <DiagnosisMemo data={data2} navigation={navigation}></DiagnosisMemo>
      <DiagnosisMemo data={data2} navigation={navigation}></DiagnosisMemo>
      <DiagnosisMemo data={data2} navigation={navigation}></DiagnosisMemo>
      <DiagnosisMemo data={data2} navigation={navigation}></DiagnosisMemo>
      <DiagnosisMemo data={data2} navigation={navigation}></DiagnosisMemo>
      <DiagnosisMemo data={data2} navigation={navigation}></DiagnosisMemo>
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