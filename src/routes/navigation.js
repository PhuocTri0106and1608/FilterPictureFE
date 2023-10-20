import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/homeScreen'
import ResultScreen from '../screens/resultScreen';
import OnboardingScreen from '../screens/onboarding';
import AboutScreen from '../screens/about'

const Stack = createNativeStackNavigator();

export const RootStackScreen = props => {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
};

const RootNavigator = props => {

    return (
      <NavigationContainer>
        <RootStackScreen {...props} />      
      </NavigationContainer>
    );
  };
  
  export default RootNavigator;