import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import { Icon } from "@rneui/themed";

const Register = ({navigation}) => {
    const [name,setName] = useState('')
    const [age,setAge] = useState('')
    const [height,setHeight] = useState('')
    const [weight,setWeight] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const register = () => {
      navigation.navigate('Home')
    }
  return (
    <View style={styles.container}>
      <Text style={{alignSelf:'center',marginTop:50,fontSize:20,fontWeight:'600',color:'#01882A'}}>Create your account</Text>

        <View style={[styles.input_view,{marginTop:30}]}>
        <Icon name='person-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Full Name"
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {setName(value)}}
              returnKeyType='next'
              multiline={false}
              value={name}
              keyboardType='default'
              autoCorrect={false}
            />
        </View>
        <View style={[styles.input_view,{marginTop:10}]}>
        <Icon name='person-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Age"
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {setAge(value)}}
              returnKeyType='next'
              multiline={false}
              value={age}
              keyboardType='number-pad'
              autoCorrect={false}
            />
        </View>
        <View style={[styles.input_view,{marginTop:10}]}>
        <Icon name='arrow-up-circle-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Height"
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {setHeight(value)}}
              returnKeyType='next'
              multiline={false}
              value={height}
              keyboardType='numeric'
              autoCorrect={false}
            />
        </View>
        <View style={[styles.input_view,{marginTop:10}]}>
        <Icon name='arrow-up-circle-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Weight"
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {setWeight(value)}}
              returnKeyType='next'
              multiline={false}
              value={weight}
              keyboardType='numeric'
              autoCorrect={false}
            />
        </View>
        <View style={[styles.input_view,{marginTop:10}]}>
        <Icon name='mail-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Email"
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {setEmail(value)}}
              returnKeyType='next'
              multiline={false}
              value={email}
              keyboardType='email-address'
              autoCorrect={false}
            />
        </View>
        <View style={[styles.input_view,{marginTop:10}]}>
        <Icon name='lock-closed-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Password"
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {setPassword(value)}}
              returnKeyType='next'
              multiline={false}
              value={password}
              secureTextEntry={true}
              keyboardType='default'
              autoCorrect={false}
            />
        </View>


        <TouchableOpacity
          onPress={() => {
            register()
          }}
          activeOpacity={0.5}
          style={styles.loginStyle}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerLabel}>already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login')
            }}
            activeOpacity={0.5}>
            <Text
              style={[
                styles.registerLabel,
                {color: '#FEC111', marginLeft: 5},
              ]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

    </View>
  )
}

export default Register

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
            height:1,
            width:1
        },
        shadowColor:'#000000',
        shadowOpacity:0.1,
        elevation:5
    },
    inputField:{
        flex:1,
        padding:0,
        color:'black',
        // fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginLeft: 15,
    },
    loginStyle: {
        marginTop: 40,
        marginLeft:30,
        marginRight:30,
        height: 50,
        backgroundColor: '#01882A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        shadowOffset:{
            height:4,
            width:4
        },
        shadowColor:'#000',
        shadowOpacity:0.1,
        elevation:5
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