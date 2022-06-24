// import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
import Plan from '../Plan';
import BMI from '../BMI';
import Profile from '../Profile';



const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            header:()=>(<View style={{height:0}}></View>)
        }}>
            <Stack.Screen name="Home_" component={Home} />
            <Stack.Screen name="plan" component={Plan} />
            <Stack.Screen name="bmi" component={BMI} />
        </Stack.Navigator>
    )
}
export {HomeStackNavigator};

const MealsStackNavigator = () => {
    return(
        <Stack.Navigator
        screenOptions={{
            header:()=>(<View style={{height:0}}></View>)
        }}>
            <Stack.Screen name="meal" component={Plan} />
        </Stack.Navigator>
    )
}
export {MealsStackNavigator};

const BookmarkStackNavigator = () => {
    return(
        <Stack.Navigator
        screenOptions={{
            header:()=>(<View style={{height:0}}></View>)
        }}>
            <Stack.Screen name="fav" component={Plan} />
        </Stack.Navigator>
    )
}
export {BookmarkStackNavigator};


const ProfileStackNavigator = () => {
    return(
        <Stack.Navigator
        screenOptions={{
            header:()=>(<View style={{height:0}}></View>)
        }}>
            <Stack.Screen name="Profileaa" component={Profile} />
        </Stack.Navigator>
    )
}
export {ProfileStackNavigator};

