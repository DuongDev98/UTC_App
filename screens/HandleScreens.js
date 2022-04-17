import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeSc from './Home';
import Login_Register_Sc from './Login_Register';

const Stack = createNativeStackNavigator();

class HandleScreens extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login_Register_Sc" component={Login_Register_Sc} options={{ headerShown: false }} />
                    <Stack.Screen name="HomeSc" component={HomeSc} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
export default HandleScreens;