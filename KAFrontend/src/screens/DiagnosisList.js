import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import DiagnosisMemo from '../components/DiagnosisMemo'
import Header from '../components/Header'



export default function DiagnosisList({ navigation }) {
  const [data, setData] = useState([])
  useEffect(() => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var myData = JSON.parse(this.responseText);
        setData(myData)
      }
    }
    xhr.open('GET', 'http://192.168.1.57:5000/api/survey/data?username=' + global.login, true);
    xhr.send();
  });
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Header>Historia wyników</Header>
      {Object.keys(data).map(n => (
        <DiagnosisMemo id={data[n].id} data={data[n]} navigation={navigation}></DiagnosisMemo>
      ))}
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