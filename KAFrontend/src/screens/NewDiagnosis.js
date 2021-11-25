import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native'
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { Text, RadioButton } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { max } from 'react-native-reanimated';

export default function NewDiagnosis({ navigation }) {
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

  const onSignUpPressed = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.1.57:5000/api/classify", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (this.readyState != 4) return;

      if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        setchestPainType('')
        setrestBloodPressure('')
        setserumCholestoral('')
        setfastingBloodSugar('')
        setelectrocardiographic('')
        setmaxHeartRate('')
        setexcerciseInducedAsthma('')
        setoldpeak('')
        setslope('')
        setmajorVessels('')
        setthal('')
        navigation.navigate('Diagnosis', id = data.id)
      }
      else {
        Alert.alert(
          "Błąd!",
          JSON.stringify({
            data: {
              chest_pain_type: parseInt(chestPainType),
              rest_blood_pressure: parseInt(restBloodPressure),
              serum_cholestoral: parseInt(serumCholestoral),
              fasting_blood_sugar: parseInt(fastingBloodSugar),
              res_electrocardiographic: parseInt(electrocardiographic),
              max_heart_rate: parseInt(maxHeartRate),
              exercise_induced: parseInt(excerciseInducedAsthma),
              oldpeak: parseInt(oldpeak),
              slope: parseInt(slope),
              major_vessels: parseInt(majorVessels),
              thal: parseInt(thal),
            },
            username: global.login
          }),
          [
            { text: "OK" }
          ]
        );
      }
      // end of state change: it can be after some time (async)
    };

    xhr.send(JSON.stringify({
      data: {
        chest_pain_type: parseInt(chestPainType),
        rest_blood_pressure: parseInt(restBloodPressure),
        serum_cholestoral: parseInt(serumCholestoral),
        fasting_blood_sugar: parseInt(fastingBloodSugar),
        res_electrocardiographic: parseInt(electrocardiographic),
        max_heart_rate: parseInt(maxHeartRate),
        exercise_induced: parseInt(excerciseInducedAsthma),
        oldpeak: parseInt(oldpeak),
        slope: parseInt(slope),
        major_vessels: parseInt(majorVessels),
        thal: parseInt(thal),
      },
      username: global.login
    }));

  }

  return (
    <ScrollView contentContainerStyle={styles.background}>
      <Header>Dodaj nowe badanie</Header>
      <Text>Rodzaj bólu klatki piersiowej</Text>
      <RNPickerSelect
        onValueChange={(value) => setchestPainType(value)}
        style={pickerSelectStyles}
        items={[
          { label: 'Typowa angina', value: '1' },
          { label: 'Atypowa angina', value: '2' },
          { label: 'Ból nieanginowy', value: '3' },
          { label: 'Brak objawów', value: '4' },
        ]}
        textInputProps={{ underlineColor: 'yellow' }}
      />
      <Text>Spoczynkowe ciśnienie krwi</Text>
      <TextInput
        returnKeyType="next"
        value={restBloodPressure}
        onChangeText={(text) => setrestBloodPressure(text)}
        keyboardType="numeric"
        style={
          Platform.OS === 'ios'
            ? pickerSelectStyles.inputIOS
            : pickerSelectStyles.inputAndroid
        }
      ></TextInput>
      <Text>Surowica cholesterolowa</Text>
      <TextInput
        returnKeyType="next"
        value={serumCholestoral}
        onChangeText={(text) => setserumCholestoral(text)}
        keyboardType="numeric"
        style={
          Platform.OS === 'ios'
            ? pickerSelectStyles.inputIOS
            : pickerSelectStyles.inputAndroid
        }
      ></TextInput>
      <Text>Cukier we krwi na czczo powyżej [x]</Text>
      <RNPickerSelect
        onValueChange={(value) => setfastingBloodSugar(value)}
        style={pickerSelectStyles}
        items={[
          { label: 'Poniżej', value: '0' },
          { label: 'Powyżej', value: '1' },
        ]}
        textInputProps={{ underlineColor: 'yellow' }}
      />
      <Text>Wynik elektrokardiografu</Text>
      <RNPickerSelect
        onValueChange={(value) => setelectrocardiographic(value)}
        style={pickerSelectStyles}
        items={[
          { label: 'Normalny', value: '0' },
          { label: 'Anormalna fala ST-T', value: '1' },
          { label: 'Przeróst lewych komór wg kryterium Romhilta-Estesa', value: '2' },
        ]}
        textInputProps={{ underlineColor: 'yellow' }}
      />
      <Text>Maksymalny puls serca</Text>
      <TextInput
        returnKeyType="next"
        value={maxHeartRate}
        onChangeText={(text) => setmaxHeartRate(text)}
        keyboardType="numeric"
        style={
          Platform.OS === 'ios'
            ? pickerSelectStyles.inputIOS
            : pickerSelectStyles.inputAndroid
        }
      ></TextInput>
      <Text>Czy pojawia się astma po ćwiczeniach?</Text>
      <RNPickerSelect
        onValueChange={(value) => setexcerciseInducedAsthma(value)}
        style={pickerSelectStyles}
        items={[
          { label: 'Nie', value: '0' },
          { label: 'Tak', value: '1' },

        ]}
        textInputProps={{ underlineColor: 'yellow' }}
      />
      <Text>Wartość Oldpeak</Text>
      <TextInput
        returnKeyType="next"
        value={oldpeak}
        onChangeText={(text) => setoldpeak(text)}
        keyboardType="numeric"
        style={
          Platform.OS === 'ios'
            ? pickerSelectStyles.inputIOS
            : pickerSelectStyles.inputAndroid
        }
      ></TextInput>
      <Text>Nachylenie wykresu</Text>
      <RNPickerSelect
        onValueChange={(value) => setslope(value)}
        style={pickerSelectStyles}
        items={[
          { label: 'Rosnący', value: '1' },
          { label: 'Stały', value: '2' },
          { label: 'Malejący', value: '3' },

        ]}
        textInputProps={{ underlineColor: 'yellow' }}
      />
      <Text>Ilość naczyń widocznych w badaniu</Text>
      <TextInput
        returnKeyType="next"
        value={majorVessels}
        onChangeText={(text) => setmajorVessels(text)}
        keyboardType="numeric"
        style={
          Platform.OS === 'ios'
            ? pickerSelectStyles.inputIOS
            : pickerSelectStyles.inputAndroid
        }
      ></TextInput>
      <Text>Thal</Text>
      <RNPickerSelect
        onValueChange={(value) => setthal(value)}
        style={pickerSelectStyles}
        items={[
          { label: 'Normalny', value: '3' },
          { label: 'Stały defekt', value: '6' },
          { label: 'Odwracalny defekt', value: '7' },

        ]}
        textInputProps={{ underlineColor: 'yellow' }}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Wyślij badanie
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  background: {
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  }
})
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 30,
  },
  inputAndroid: {
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 30,
  },
});