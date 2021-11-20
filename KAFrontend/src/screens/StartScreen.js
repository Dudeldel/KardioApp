import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>KardioApp</Header>
      <Paragraph>
        Nie czekaj aż choroba {'\n'} zaskoczy Twoje serce.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Logowanie
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Rejestracja
      </Button>
    </Background>
  )
}
