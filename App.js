import React from 'react';
import {SafeAreaView,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/Home';
import Login from './src/Login';
import Plan from './src/Plan';
import Register from './src/Register';
import BMI from './src/BMI';

const Stack = createNativeStackNavigator();

const App = () => {


  return (
    
    <SafeAreaProvider style={{flex:1,backgroundColor:'#eee'}}>
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
            header:()=>(<View style={{height:0}}></View>)
        }}>
        {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} /> */}
        <Stack.Screen name="BMI" component={BMI} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Plan" component={Plan} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
