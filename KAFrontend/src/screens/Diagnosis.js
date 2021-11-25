import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import DiagnosisMemo from '../components/DiagnosisMemo'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Dashboard({ navigation, route }) {
  const [chestPainType, setchestPainType] = useState('')
  const [restBloodPressure, setrestBloodPressure] = useState('')
  const [serumCholestoral, setserumCholestoral] = useState('')
  const [fastingBloodSugar, setfastingBloodSugar] = useState('')
  const [electrocardiographic, setelectrocardiographic] = useState('')
  const [maxHeartRate, setmaxHeartRate] = useState('')
  const [excerciseInducedAsthma, setexcerciseInducedAsthma] = useState('')
  const [oldpeak, setoldpeak] = useState('')
  const [slope, setslope] = useState('')
  const [majorVessels, setmajorVessels] = useState('')
  const [thal, setthal] = useState('')
  const [date, setDate] = useState('')
  const [result, setResult] = useState([])
  useEffect(() => {
    var id = route.params.id
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var data = JSON.parse(this.responseText);
        console.log(xhr.responseText);
        var survey = data[0]
        var date = new Date(survey.date)
        setDate(date.toISOString().split('T')[0])
        switch (survey.chest_pain_type) {
          case 1:
            setchestPainType('Typowa angina')
            break;
          case 2:
            setchestPainType('Atypowa angina')
            break;
          case 3:
            setchestPainType('Ból nieanginowy')
            break;
          case 4:
            setchestPainType('Brak objawów')
            break;
        }
        setrestBloodPressure(survey.rest_blood_pressure)
        setserumCholestoral(survey.serum_cholestoral)
        survey.fasting_blood_sugar == 0 ? setfastingBloodSugar('Poniżej') : setfastingBloodSugar('Powyżej')
        switch (survey.res_electrocardiographic) {
          case 0:
            setelectrocardiographic('Normalny')
            break;
          case 1:
            setelectrocardiographic('Anormalna fala ST-T')
            break;
          case 2:
            setelectrocardiographic('Przeróst lewych komór wg kryterium Romhilta-Estesa')
            break;
        }
        setmaxHeartRate(survey.max_heart_rate)
        survey.exercise_induced == 0 ? setexcerciseInducedAsthma('Nie') : setexcerciseInducedAsthma('Tak')
        setoldpeak(survey.oldpeak)
        switch (survey.slope) {
          case 1:
            setslope('Rosnący')
            break;
          case 2:
            setslope('Stały')
            break;
          case 3:
            setslope('Malejący')
            break;
        }
        setmajorVessels(survey.major_vessels)
        switch (survey.thal) {
          case 3:
            setthal('Normalny')
            break;
          case 6:
            setthal('Stały defekt')
            break;
          case 7:
            setthal('Odwracalny defekt')
            break;
        }
        var wynikZAnkiety = []
        var models = survey.model_name.split(',')
        var prognosis = survey.prognosis.split(',')
        var proba = survey.predict_proba.split(',')
        var sumproba = 0
        var sumprognosis = 0
        for (var i = 0; i < 4; i++) {
          var line = new Object();
          line.name = models[i];
          line.prognosis = prognosis[i];
          sumprognosis += parseInt(prognosis[i]);
          line.proba = proba[i];
          sumproba += parseFloat(proba[i])
          wynikZAnkiety.push(line)
        }
        var line = new Object();
        line.name = 'Average'
        line.prognosis = sumprognosis / 4
        line.proba = (sumproba / 4)
        wynikZAnkiety.push(line)
        console.log("TWOJA STARA")
        console.log(wynikZAnkiety)
        setResult(wynikZAnkiety)
      }
    }
    xhr.open('GET', 'http://192.168.1.57:5000/api/survey/result?id=' + id, true);
    xhr.send();
  }, [])
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <View style={{ marginTop: 25 }}></View>
      <Header>Diagnoza z dnia {date}</Header>
      <View style={{ flex: 1 }}>
        {console.log("No nie!")}
        {result.length != 0 ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {result[4].prognosis >= 2
              ? <View style={{ alignItems: 'center' }}><MaterialCommunityIcons name="alert-circle" color={"red"} size={64} /><Text style={{ fontSize: 25 }}>Wynik: </Text><Text style={{ color: 'red', fontSize: 25 }}>Pozytywny</Text></View>
              : <View style={{ alignItems: 'center' }}><MaterialCommunityIcons name="check-bold" color={"green"} size={64} /><Text style={{ fontSize: 25 }}>Wynik: </Text><Text style={{ color: 'green', fontSize: 25 }}>Negatywny</Text></View>
            }
            <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 15 }}>Pewność: {result[4].proba}%</Text>
            <Text>{result[0].name}: {result[0].prognosis == 2 ? 'Pozytywny' : 'Negatywny'}({result[0].proba}%)</Text>
            <Text>{result[1].name}: {result[1].prognosis == 2 ? 'Pozytywny' : 'Negatywny'}({result[1].proba}%)</Text>
            <Text>{result[2].name}: {result[2].prognosis == 2 ? 'Pozytywny' : 'Negatywny'}({result[2].proba}%)</Text>
            <Text>{result[3].name}: {result[3].prognosis == 2 ? 'Pozytywny' : 'Negatywny'}({result[3].proba}%)</Text>

          </View> : <Text>x</Text>}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
          <Text style={styles.text}>Rodzaj bólu klatki piersiowej: <Text style={{ fontWeight: 'bold' }}>{chestPainType}</Text></Text>
          <Text style={styles.text}>Cukier we krwi na czczo powyżej [x]: <Text style={{ fontWeight: 'bold' }}>{fastingBloodSugar}</Text></Text>
          <Text style={styles.text}>Wynik elektrokardiografu: <Text style={{ fontWeight: 'bold' }}>{electrocardiographic}</Text></Text>
          <Text style={styles.text}>Czy pojawia się astma po ćwiczeniach?: <Text style={{ fontWeight: 'bold' }}>{excerciseInducedAsthma}</Text></Text>
          <Text style={styles.text}>Spoczynkowe ciśnienie krwi: <Text style={{ fontWeight: 'bold' }}>{restBloodPressure}</Text></Text>
          <Text style={styles.text}>Surowica cholesterolowa: <Text style={{ fontWeight: 'bold' }}>{serumCholestoral}</Text></Text>
          <Text style={styles.text}>Nachylenie wykresu: <Text style={{ fontWeight: 'bold' }}>{slope}</Text></Text>
          <Text style={styles.text}>Thal: <Text style={{ fontWeight: 'bold' }}>{thal}</Text></Text>
          <Text style={styles.text}>Maksymalny puls serca: <Text style={{ fontWeight: 'bold' }}>{maxHeartRate}</Text></Text>
          <Text style={styles.text}>Wartość Oldpeak: <Text style={{ fontWeight: 'bold' }}>{oldpeak}</Text></Text>
          <Text style={styles.text}>Ilość naczyń widocznych w badaniu: <Text style={{ fontWeight: 'bold' }}>{majorVessels}</Text></Text>
        </View>
      </View>
    </ScrollView >
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
  text: {
    fontWeight: 'normal',
    padding: 2.5,
    fontSize: 14,
  },
})