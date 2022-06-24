import React from 'react';
import {SafeAreaView,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/Home';
import Login from './src/Login';
import Plan from './src/Plan';
import Register from './src/Register';
import BMI from './src/BMI';
import { BookmarkStackNavigator, HomeStackNavigator, ProfileStackNavigator, MealsStackNavigator } from './src/Components/CustomeStack';
import CustomTabBar from './src/Components/CustomTabBar';
import App from './App';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Start = () => {


  return (
    
    <SafeAreaProvider style={{flex:1,backgroundColor:'#eee'}}>
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
            header:()=>(<View style={{height:0}}></View>)
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="App" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider> 
  );
};

export default Start;
