import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Text, RadioButton } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from 'react-native-gesture-handler'


export default function UserScreen({ navigation }) {
  const [name, setName] = useState('')
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [checked, setChecked] = useState('man');
  const [editMode, setEditMode] = useState(false);
  const [getData, setGetData] = useState(true)
  useEffect(() => {
    if (getData) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://192.168.1.57:5000/api/user/login", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
          var data = JSON.parse(this.responseText);
          setName(data.first_name + " " + data.last_name)
          setDate(new Date(data.birth_date))
          data.sex == 1 ? setChecked('man') : setChecked('woman')
          setGetData(false)
        }
        else {
          Alert.alert(
            "Błąd!",
            "Nieprawidłowy login lub hasło",
            [
              { text: "OK" }
            ]
          );
        }
        // end of state change: it can be after some time (async)
      };

      xhr.send(JSON.stringify({
        username: global.login,
        password: global.password.toString()
      }));
    }
  });
  const handleConfirm = (date) => {
    setDate(date);
    setShow(false);
  };
  const onSignUpPressed = () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }
    var fullname = name.split(" ")
    var firstName = fullname[0]
    var lastName = fullname[1]
    var sex = 0
    var birthDate = date.toISOString().split('T')[0]
    if (checked == "man") {
      sex = 1
    }
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", "http://192.168.1.57:5000/api/user/edit", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (this.readyState != 4) return;

      if (this.status == 200) {
        setGetData(true)
      }
      else {
        Alert.alert(
          "Błąd!",
          xhr.responseText,
          [
            { text: "OK" }
          ]
        );
      }
      // end of state change: it can be after some time (async)
    };

    xhr.send(JSON.stringify({
      username: global.login,
      firstName: firstName,
      lastName: lastName,
      sex: sex,
      birthDate: birthDate
    }));

  }

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <Header>Konto użytkownika</Header>
      <TextInput
        label="Twoje imię"
        returnKeyType="next"
        value={name}
        onChangeText={(text) => setName(text)}
        editable={editMode}
      />
      <TouchableOpacity style={{ width: '100%' }} onPress={() => { editMode ? setShow(true) : setShow(false) }}>
        <TextInput
          label="Data urodzenia"
          returnKeyType="done"
          value={date.getFullYear() + "-" + (('0' + (date.getMonth() + 1)).slice(-2)) + "-" + ('0' + (date.getDate())).slice(-2)}
          pointerEvents="none"
          editable={editMode}

        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        date={date}
        maximumDate={new Date()}
        textColor='black'
        onConfirm={handleConfirm}
        onCancel={() => setShow(false)}
        locale='pl-PL'
      />
      <View style={styles.radioGroup}>
        <Text onPress={() => { editMode ? setChecked('man') : null }} style={checked === 'man' ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}> Mężczyzna </Text>
        <RadioButton.Android
          value="man"
          status={checked === 'man' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('man')}
          style={{ marginRight: 50 }}
          color={theme.colors.primary}
          disabled={!editMode}
        />
        <Text onPress={() => { editMode ? setChecked('woman') : null }} style={checked === 'woman' ? { fontWeight: 'bold', marginLeft: 50 } : { fontWeight: 'normal', marginLeft: 50 }}> Kobieta </Text>
        <RadioButton.Android
          value="woman"
          status={checked === 'woman' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('woman')}
          color={theme.colors.primary}
          disabled={!editMode}
        />
      </View>

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        {editMode ? "Zaktualizuj dane" : "Edytuj dane"}
      </Button>
    </View >
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 48,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  radioGroup: {
    marginTop: 24,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    backgroundColor: theme.colors.secondary,
  },
  container: {
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})