import { Alert, Image, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverIP } from '../Constants';

const Login = ({navigation}) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const displayMessage = (title,message) => {
      Platform.OS === 'android' ?
      ToastAndroid.show(message,ToastAndroid.LONG):
      Alert.alert(title,message,'OK')
    }
    const saveUserData = async (data) =>{
      try {
        const userData = JSON.stringify(data)
        await AsyncStorage.setItem('userInfo', userData)
      } catch (e) {
        /* saving error */
        console.log("error aa jira ",e)
      }
    }

    const tryLogin = async () => {
      /*check if username and password are empty*/
      if(username === ''){
        displayMessage("Login","Username can not be empty")
      }
      else if(password === ''){displayMessage("Login","Password can not be empty")}
      else{
        var formData = new FormData();
        formData.append('email', username);
        formData.append('password', password);
        let url = serverIP+'user.php?user=login'
        fetch(url,{
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
          },
          body: formData
        })
        .then(response => {
          if(!response.ok){
            throw new Error('could not fetch data')
          }
          return response.json()
        })
        .then(result =>{
          // console.log(result)
          if(result?.status === 'logged'){
            saveUserData(result)
            .then(navigation.replace('App'))
          }else displayMessage("error ",result?.status)
        })
        .catch(error =>{
          console.log(error)
        })
      }
    }
  return (
    <View style={styles.container}>
      <Text style={{alignSelf:'center',marginTop:50,fontSize:20,fontWeight:'600',color:'#01882A'}}>Login</Text>
      <Image source={require('./assets/logo.png')} style={{height:150,width:150,resizeMode:'contain',alignSelf:'center',marginTop:50}} />
        
        <View style={[styles.input_view,{marginTop:50}]}>
        <Icon name='mail' type='ionioc' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Username"
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {setUsername(value)}}
              returnKeyType='next'
              multiline={false}
              value={username}
              keyboardType="email-address"
              autoCorrect={false}
            />
        </View>

        <View style={[styles.input_view,{marginTop:20}]}>
        <Icon name='lock-closed' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Password"
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {setPassword(value)}}
              returnKeyType='next'
              multiline={false}
              secureTextEntry={true}
              value={password}
              autoCorrect={false}
            />
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('forgot')}>
        <Text style={styles.forgotLabel}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            tryLogin()
          }}
          activeOpacity={0.5}
          style={styles.loginStyle}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerLabel}>Don’t have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register')
            }}
            activeOpacity={0.5}>
            <Text
              style={[
                styles.registerLabel,
                {color: '#FEC111', marginLeft: 5},
              ]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    input_view:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#FFF',
        height:50,
        marginLeft:30,
        marginRight:30,
        padding:10,
        borderRadius:10,
        shadowOffset:{
            height:2,
            width:2
        },
        shadowColor:'#000000',
        shadowOpacity:0.1,
        elevation:0.2
    },
    inputField:{
        flex:1,
        padding:0,
        color:'black',
        // fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginLeft: 15,
    },
    forgotLabel: {
        // fontFamily: 'Roboto-Regular',
        fontSize: 12,
        alignSelf:'flex-end',
        marginTop: 10,
        marginRight: 30,
        fontWeight:'600',
        color:'#01882A'
    },
    loginStyle: {
        marginTop: 40,
        marginLeft:30,
        marginRight:30,
        height: 42,
        backgroundColor: '#01882A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
      },
      loginText: {
        color: '#FFF',
        // fontFamily: 'Roboto-Bold',
        fontSize: 18,
      },
      registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
      },
      registerLabel: {
        // fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#666',
      },
      
})