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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={{flex:1,backgroundColor:'#eee'}}>
    {/* <NavigationContainer> */}
    <Tab.Navigator
    screenOptions={{
      header:()=>(
        <View style={{height:0}}></View>
      )
    }}
       barStyle={{ backgroundColor: 'red' }} tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStackNavigator}
      options={{ unmountOnBlur: true }}
      listeners={({ navigation }) => ({
        blur: () => navigation.setParams({ screen: undefined }),
      })} />
      <Tab.Screen name="Meals" component={MealsStackNavigator} 
      options={{ unmountOnBlur: true }}
      listeners={({ navigation }) => ({
        blur: () => navigation.setParams({ screen: undefined }),
      })}/>
      <Tab.Screen name="Favorite" component={BookmarkStackNavigator} 
      options={{ unmountOnBlur: true }}
      listeners={({ navigation }) => ({
        blur: () => navigation.setParams({ screen: undefined }),
      })}/>
      <Tab.Screen name="Profile" component={ProfileStackNavigator} 
      options={{ unmountOnBlur: true }}
      listeners={({ navigation }) => ({
        blur: () => navigation.setParams({ screen: undefined }),
      })}/>
    </Tab.Navigator>
    {/* </NavigationContainer> */}
    
    {/* <SafeAreaProvider style={{flex:1,backgroundColor:'#eee'}}>
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
            header:()=>(<View style={{height:0}}></View>)
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Plan" component={Plan} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider> */}
    </SafeAreaProvider>
  );
};

export default App;
