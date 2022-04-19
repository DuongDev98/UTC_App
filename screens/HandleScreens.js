import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashSc from './FlashScreen';
import MainSc from './Main';
import Login_Register_Sc from './Login_Register';

const Stack = createNativeStackNavigator();

class HandleScreens extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="FlashSc" component={FlashSc} options={{ headerShown: false }} />
                    <Stack.Screen name="Login_Register_Sc" component={Login_Register_Sc} options={{ headerShown: false }} />
                    <Stack.Screen name="MainSc" component={MainSc} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
export default HandleScreens;