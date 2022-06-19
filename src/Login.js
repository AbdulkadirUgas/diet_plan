import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from "@rneui/themed";

const Login = ({navigation}) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const tryLogin =() => {
      navigation.navigate('Home')
    }
  return (
    <View style={styles.container}>
      <Text style={{alignSelf:'center',marginTop:50,fontSize:20,fontWeight:'600',color:'#01882A'}}>Login</Text>
      <Image source={require('./assets/logo.png')} style={{height:120,width:120,resizeMode:'contain',alignSelf:'center',marginTop:50}} />
        
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

        <TouchableOpacity activeOpacity={0.5} >
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