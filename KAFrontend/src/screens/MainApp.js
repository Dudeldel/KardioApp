import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DiagnosisList from './DiagnosisList.js'
import LoginScreen from '../screens/LoginScreen.js'


const Tab = createMaterialBottomTabNavigator();

export default function MainApp({ navigation }) {
    return (
        <Tab.Navigator initialRouteName="Badania" activeColor="#ffffff" barStyle={{ backgroundColor: '#560CCE' }}>
            <Tab.Screen name="Nowe" component={LoginScreen} options={{
                tabBarLabel: 'Nowe',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="briefcase-plus" color={color} size={26} />
                ),
            }}
            />
            <Tab.Screen name="Badania" component={DiagnosisList}
                options={{
                    tabBarLabel: 'Badania',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="format-list-checkbox" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Konto" component={LoginScreen}
                options={{
                    tabBarLabel: 'Konto',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }} />
        </Tab.Navigator>
    )
}
