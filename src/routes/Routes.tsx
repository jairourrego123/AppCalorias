import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Home from '../pages/Home';
import AddFood from '../pages/AddFood';
import {RootStackParamsList} from '../types'

export default function Routes() {
    const Stack = createNativeStackNavigator<RootStackParamsList>();
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name = "Home" component={Home} options={{headerShown:false}}/>
                <Stack.Screen name = "AddFood" component={AddFood}options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );

}
