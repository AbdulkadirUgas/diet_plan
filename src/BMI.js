import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import Header from './Components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverIP } from '../Constants';

const BMI = ({navigation}) => {
  const [userData,setUserData] = useState({})
  const [activeUser,setActiveUser] = useState([]);
  const [bmi,setBMI] = useState('');
  const [status,setStatus] = useState('Normal');
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
    console.log('inside',activeUser)
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
      console.log(result?.result)
        setUserData(result?.result[0]);
        const weight = result?.result[0].weight
        let height = result?.result[0].height
        height = height/100 /// changing height from cm to m
        setBMI(weight / (height * height))
        if(weight / (height * height) <= 18.4 ) setStatus('Underweight')
        else if(weight / (height * height) >= 18.5 &&  weight / (height * height) <= 24.9 )setStatus('Normal')
        else if(weight / (height * height) >= 25 &&  weight / (height * height) <= 39.9 )setStatus('Overweight')
        else if(weight / (height * height) >= 40 )setStatus('Obese')
    })
    .catch(error =>{
      console.log(error)
    })
    const displayData = (data) => {
      setName(data.name)
    }
  }
  return (
    <View style={styles.container}>
    <Header filter='back' title='BMI test' action={()=>{navigation.goBack()}}/>
      <View style={{backgroundColor:'#f5f5f5',flex:1,marginTop:20,paddingTop:30,borderTopRightRadius:40,borderTopLeftRadius:40,}}>
      <Text style={{fontSize:20,fontWeight:'600',color:'#01882A',alignSelf:'center'}}>Your result</Text>
      <View style={{backgroundColor:'#FFF',marginTop:20,marginLeft:20,marginRight:20,padding:30,borderRadius:20}}>
        <Text style={{fontSize:20,fontWeight:'700',color:'#01882A',alignSelf:'center'}}>{status}</Text>
        <Text style={{fontSize:20,fontWeight:'700',marginTop:5,color:'#F44336',alignSelf:'center'}}>{Math.round(bmi*100)/100}</Text>

        <View style={{flexDirection:'row',marginTop:25,alignItems:'center'}}>
        <Text style={{fontSize:18,color:'black'}}>Your weight in kilogram: </Text>
        <Text style={{fontSize:18,color:'black',fontWeight:'700'}}> {userData.weight}KG</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
        <Text style={{fontSize:18,color:'black'}}>Your height in meters:</Text>
        <Text style={{fontSize:18,color:'black',fontWeight:'700'}}> {userData.height}M</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
        <Text style={{fontSize:18,color:'black'}}>Your body weight:</Text>
        <Text style={{fontSize:18,color:'black',fontWeight:'700'}}> {status}</Text>
        </View>
        <Text style={{fontSize:18,marginTop:10,color:'black',fontWeight:'700'}}>Good job!</Text>
      </View>
      </View>
    </View>
  )
}

export default BMI

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF'
    },
})