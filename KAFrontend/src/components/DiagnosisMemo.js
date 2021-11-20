import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { theme } from '../core/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper'
export default function DiagnosisMemo({ data }) {
  return (
    <View style={styles.container} behavior="padding">
      <View style={{ flex: 1, alignSelf: 'flex-start' }}><Text style={styles.date}>Data: {data.date}</Text></View>
      <View style={{ flex: 9, flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.isDiagnosed}>
          {data.isSick
            ? <MaterialCommunityIcons name="alert-circle" color={"red"} size={48} />
            : <MaterialCommunityIcons name="check-bold" color={"green"} size={48} />
          }
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Puls:</Text>
          <Text style={styles.text}>Cholesterol:</Text>
          <Text style={styles.text}>Coś1:</Text>
          <Text style={styles.text}>Coś2:</Text>
        </View>
        <View style={styles.det}>
          <Text style={styles.text}>{data.pulse}</Text>
          <Text style={styles.text}>{data.choles}</Text>
          <Text style={styles.text}>{data.something1}</Text>
          <Text style={styles.text}>{data.something2}</Text>
        </View>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  isDiagnosed: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 10
  },
  info: {
    flex: 2,
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'flex-start',

  },
  det: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'flex-end',
  },
  text: {
    fontWeight: 'bold',
    padding: 2.5,
  },
  date: {
    textAlign: 'left',
    color: '#aaa'
  }
})