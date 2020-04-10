import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import { Main } from './pages/Main'
import { Profile } from './pages/Profile'

const AppStack = createStackNavigator()

export const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#7159c1'
                    },
                    headerTintColor: '#fff'
                }} >
                <AppStack.Screen
                    name="Main"
                    component={Main}
                    options={{
                        title: 'Home',
                        headerTitleAlign: 'center'
                    }}
                />
                <AppStack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        title: 'Perfil no GitHub',
                        headerTitleAlign: 'center'
                    }} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}