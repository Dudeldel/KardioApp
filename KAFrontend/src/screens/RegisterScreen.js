import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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


export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [checked, setChecked] = useState('man');

  const handleConfirm = (date) => {
    setDate(date);
    setShow(false);
  };
  const onSignUpPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Zarejestruj się</Header>
      <TextInput
        label="Twoje imię"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="E-mail"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Hasło"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TouchableOpacity style={{ width: '100%' }} onPress={() => setShow(true)}>
        <TextInput
          label="Data urodzenia"
          returnKeyType="done"
          value={date.getFullYear() + "-" + (('0' + (date.getMonth() + 1)).slice(-2)) + "-" + ('0' + (date.getDate())).slice(-2)}
          pointerEvents="none"

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
        <Text onPress={() => setChecked('man')} style={checked === 'man' ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}> Mężczyzna </Text>
        <RadioButton.Android
          value="man"
          status={checked === 'man' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('man')}
          style={{ marginRight: 50 }}
          color={theme.colors.primary}
        />
        <Text onPress={() => setChecked('woman')} style={checked === 'woman' ? { fontWeight: 'bold', marginLeft: 50 } : { fontWeight: 'normal', marginLeft: 50 }}> Kobieta </Text>
        <RadioButton.Android
          value="woman"
          status={checked === 'woman' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('woman')}
          color={theme.colors.primary}
        />
      </View>

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Zarejestruj się
      </Button>
      <View style={styles.footer}>
        <Text>Masz już konto? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Zaloguj się</Text>
        </TouchableOpacity>
      </View>
    </Background >
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
  }
})
