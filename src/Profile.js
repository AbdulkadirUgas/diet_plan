import { Alert, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Icon } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {validateRegisterData} from '../Validate'
import { serverIP } from '../Constants';

const Profile = ({navigation}) => {
    const [userData,setUserData] = useState({})
    const [name,setName] = useState('')
    const [age,setAge] = useState('')
    const [height,setHeight] = useState('')
    const [weight,setWeight] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [activeGender,setActiveGender] = useState('')
    const [activePlan,setActivePlan] = useState('')
    const [activeUser,setActiveUser] = useState([]);

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
    const activateCurrentGender = (cur_gender) =>{
      let newArr = [...gender];
      newArr.forEach((gender) =>{
      if(gender.label === cur_gender)
      gender.isSelected = true
      else gender.isSelected = false
      })
      setActiveGender(cur_gender)
      setGender(newArr)
    }
    const activateCurrentPlan = (planID) =>{
      let newArr = [...plan];
      newArr.forEach((plan) =>{
      if(plan.id === planID)
        plan.isSelected = true
      else plan.isSelected = false
      })
      setActivePlan(planID)
      setPlan(newArr)

    }
    const displayMessage = (title,message) => {
      Platform.OS === 'android' ?
      ToastAndroid.show(message,ToastAndroid.LONG):
      Alert.alert(title,message,'OK')
    }
    
    useEffect(() => {
      loadUserData()
    },[])
    useEffect(() => {
      fetchProfileInfo()
    },[activeUser])

    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('userInfo')
      const data = userData != null ? JSON.parse(userData) : null
      setActiveUser(data)
    }
    const fetchProfileInfo = () => {
      var formData = new FormData();
      console.log('data',activeUser)
      formData.append('userID', activeUser?.userID);
      let url = serverIP+'user.php?user=getUserInfo'
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
          setUserData(result?.result[0]);
          activateCurrentPlan(result?.result[0].catID)
          activateCurrentGender(result?.result[0].gender)
      })
      .catch(error =>{
        console.log(error)
      })
      const displayData = (data) => {
        setName(data.name)
      }
    }
    const update = () => {
      const {errors,valid} = validateRegisterData(userData.name,userData.age,userData.height,userData.weight,userData.activeGender,userData.email,'da')
      if(!valid){
        displayMessage("Error",errors.error)
      }else{
        var formData = new FormData();
        formData.append('userID', activeUser?.userID);
        formData.append('name', userData.name);
        formData.append('age', userData.age);
        formData.append('height', userData.height);
        formData.append('weight', userData.weight);
        formData.append('gender', activeGender);
        formData.append('plan', activePlan);
        let url = serverIP+'user.php?user=update'
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
          if(result?.status === 'updated'){
            displayMessage('Updated','Profile updated succesfully')
          }else displayMessage("error ",result?.status)
        })
        .catch(error =>{
          console.log(error)
        })
      }
    }

    const deActivate = () =>{
      var formData = new FormData();
        formData.append('userID', activeUser?.userID);
        let url = serverIP+'user.php?user=deActiveUser'
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
          if(result?.status === 'updated'){
            navigation.replace('Login')
          }else displayMessage("error ",result?.status)
        })
        .catch(error =>{
          console.log(error)
        })
      
    }
    const logout = () => {
      console.log('logout')
    }
  return (
    <View style={styles.container}>
      <Text style={{alignSelf:'center',marginTop:50,fontSize:20,fontWeight:'600',color:'#01882A'}}>Edit Profile</Text>

        <View style={[styles.input_view,{marginTop:30}]}>
        <Icon name='person-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Full Name"
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {setUserData({...userData,name:value})}}
              returnKeyType='next'
              multiline={false}
              value={userData?.name}
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
              onChangeText = {(value) => {setUserData({...userData,age:value})}}
              returnKeyType='next'
              multiline={false}
              value={userData?.age}
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
              onChangeText = {(value) => {setUserData({...userData,height:value})}}
              returnKeyType='next'
              multiline={false}
              value={userData?.height}
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
              onChangeText = {(value) => {setUserData({...userData,weight:value})}}
              returnKeyType='next'
              multiline={false}
              value={userData?.weight}
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
        <Icon name='mail-outline' type='ionicon' color='#000' size={20} style={{marginLeft:20}}/>
        <TextInput
              style={styles.inputField}
              placeholder="Email"
              editable={false}
              placeholderTextColor='#C4C4C4'
              onChangeText = {(value) => {}}
              returnKeyType='next'
              multiline={false}
              value={userData?.email}
              keyboardType='email-address'
              autoCorrect={false}
            />
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


        <TouchableOpacity
          onPress={() => {
            update()
          }}
          activeOpacity={0.5}
          style={styles.loginStyle}>
          <Text style={styles.loginText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {navigation.replace('Login')}}
          activeOpacity={0.5}
          style={[styles.loginStyle,{backgroundColor:'#E23C3C',marginTop:20}]}>
          <Text style={styles.loginText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {deActivate()}}
          activeOpacity={0.5}
          style={[styles.loginStyle,{backgroundColor:'#D1D1D1',marginTop:20}]}>
          <Text style={styles.loginText}>De-Activate</Text>
        </TouchableOpacity>

    </View>
  )
}

export default Profile

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