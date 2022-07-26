import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from './Components/Header'
import { Icon } from '@rneui/themed'

const Forgot = ({navigation}) => {
  const [email,setEmail] = useState('')
  return (
    <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
        <Header filter='back' title='Forgot passowrd' action={()=>{navigation.goBack()}}/>
        <View style={{flex:1,justifyContent:'center',paddingHorizontal:20}}>
        <View style={styles.wrap_view}>
          <Text style={{fontSize:16,alignSelf:'center',color:'black',marginTop:20}}>Enter your email to reset your password</Text>
          <View style={[styles.input_view,{marginTop:30}]}>
            <Icon name='mail' type='ionioc' color='#000' size={20} style={{marginLeft:20}}/>
            <TextInput
                  style={styles.inputField}
                  placeholder="Email"
                  placeholderTextColor='#C4C4C4'
                  onChangeText = {(value) => {setEmail(value)}}
                  returnKeyType='next'
                  multiline={false}
                  value={email}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
        </View>
        <TouchableOpacity
          onPress={() => {

          }}
          activeOpacity={0.5}
          style={styles.loginStyle}>
          <Text style={styles.loginText}>Reset</Text>
        </TouchableOpacity>
        
        </View>
        </View>
    </View>
  )
}

export default Forgot

const styles = StyleSheet.create({
  wrap_view:{
    backgroundColor:'white',
    borderRadius:10,
    padding:10,
    paddingBottom:20
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
      fontSize: 16,
      marginLeft: 15,
  },
  loginStyle: {
    marginTop: 20,
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
})