import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Components/Header';

const WeightMNG = ({navigation}) => {
    const [activeUser,setActiveUser] = useState({});
    useEffect(() => {
        loadUserData()
    },[])
    const loadUserData = async () => {
        const userData = await AsyncStorage.getItem('userInfo')
        const data = userData != null ? JSON.parse(userData) : null
        setActiveUser(data)
    }
    const plan = [
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
    ]
  return (
    <View style={styles.container}>
    <Header filter='back' title='Weight management' action={()=>{navigation.goBack()}}/>
      <View style={{backgroundColor:'#f5f5f5',flex:1,marginTop:20,paddingTop:30,borderTopRightRadius:40,borderTopLeftRadius:40,}}>
      {/* <Text style={{fontSize:20,fontWeight:'600',color:'#01882A',alignSelf:'center'}}>Weight management</Text> */}
      <View style={{backgroundColor:'#FFF',marginTop:20,marginLeft:20,marginRight:20,padding:30,borderRadius:20}}>
        <Text style={{fontSize:20,fontWeight:'700',color:'#01882A',alignSelf:'center'}}>Hello, {activeUser?.name && activeUser?.name.split(' ')[0]}</Text>
        {/* <Text style={{fontSize:20,fontWeight:'700',marginTop:10,color:'#F44336',alignSelf:'center'}}>22.2</Text> */}
        <Text style={{fontSize:16,marginTop:10,alignSelf:'center',color:'#01882A'}}>You have have selected Weight {plan[activeUser?.plan-1].label}</Text>
      </View>
      </View>
    </View>
  )
}

export default WeightMNG
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF'
    },
})