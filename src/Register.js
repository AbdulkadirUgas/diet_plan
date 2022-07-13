import { Alert, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import { Icon } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {validateRegisterDate} from '../Validate'
import { serverIP } from '../Constants';

const Register = ({navigation}) => {
    const [name,setName] = useState('')
    const [age,setAge] = useState('')
    const [height,setHeight] = useState('')
    const [weight,setWeight] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [activeGender,setActiveGender] = useState('')
    const [activePlan,setActivePlan] = useState('')

    const [gender,setGender] = useState([
      {
        label: 'Male',
        isSelected: false
      },
      {
        label: 'Female',
        isSelected: false
      }
    ])
    const [plan,setPlan] = useState([
      {
        id:'1',
        label: 'Gain',
        isSelected: false
      },
      {
        id:'2',
        label: 'Loss',
        isSelected: false
      }
    ])
    const selectGender = (index) =>{
      let newArr = [...gender];
      newArr.forEach((gender) =>{
        gender.isSelected = false
      })
      newArr[index].isSelected = true
      setActiveGender(newArr[index].label)
      setGender(newArr)
    }
    const updatePlan = (index) =>{
      let newArr = [...plan];
      newArr.forEach((plan) =>{
      plan.isSelected = false
      })
      newArr[index].isSelected = true
      setActivePlan(newArr[index].id)
      setPlan(newArr)
  }
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
      // saving error
      console.log("error aa jira ",e)
    }
  }
    const register = () => {
      const {errors,valid} = validateRegisterDate(name,age,height,weight,activeGender,email,password)
      if(!valid){
        displayMessage("Error",errors.error)
      }else{
        var formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('age', age);
        formData.append('height', height);
        formData.append('weight', weight);
        console.log('selected plan '+activePlan)
        formData.append('gender', activeGender);
        formData.append('plan', activePlan);
        formData.append('password', password);
        let url = serverIP+'user.php?user=register'
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
          console.log(result)
          if(result?.status === 'success'){
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
      <Text style={{alignSelf:'center',marginTop:60,fontSize:20,fontWeight:'600',color:'#01882A'}}>Create your account</Text>

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
        <Icon name='arrow-forward-circle-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
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
        <Icon name='transgender-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <View style={{marginLeft:15,flexDirection: 'row'}}>
          {
            gender.map((gender,index) =>(
            <TouchableOpacity onPress={() => {selectGender(index)}} activeOpacity={0.5} key={index} style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',marginRight:15}}>
            <View style={styles.radioO}>
              <View style={gender.isSelected ? styles.radioI : null}/>
            </View>
            <Text style={{marginLeft:4,color:'black'}}>{gender.label}</Text>
            </TouchableOpacity>
            ))
          }
        </View>
        </View>

        <View style={[styles.input_view,{marginTop:10}]}>
        <Icon name='leaf-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <View style={{marginLeft:15,flexDirection: 'row'}}>
          {
            plan.map((plan,index) =>(
            <TouchableOpacity onPress={() => {updatePlan(index)}} activeOpacity={0.5} key={index} style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',marginRight:15}}>
            <View style={styles.radioO}>
              <View style={plan.isSelected ? styles.radioI : null}/>
            </View>
            <Text style={{marginLeft:4,color:'black'}}>{plan.label}</Text>
            </TouchableOpacity>
            ))
          }
        </View>
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
      radioO:{
        height: 22,
        width:22,
        borderRadius:50,
        borderColor: '#01882A',
        borderWidth:2,
        justifyContent: 'center',
        alignItems:'center'
      },
      radioI:{
        height: 14,
        width:14,
        borderRadius:50,
        backgroundColor: '#01882A',
      }
})