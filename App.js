import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Home from './src/Home';
import Login from './src/Login';
import Plan from './src/Plan';
import Register from './src/Register';



const App = () => {


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#eee'}}>
    <Plan/>
    </SafeAreaView>
  );
};

export default App;
