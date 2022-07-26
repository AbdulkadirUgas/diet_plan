import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Components/Header';

const WeightMNG = ({navigation}) => {
    const [activeUser,setActiveUser] = useState({})
    const [activePlan,setActivePlan] = useState('')
    useEffect(() => {
        loadUserData()
    },[])
    const loadUserData = async () => {
        const userData = await AsyncStorage.getItem('userInfo')
        const data = userData != null ? JSON.parse(userData) : null
        plan.forEach(plan => {
          plan.id === data?.plan ? setActivePlan(plan.label) : null
        });
        console.log(data)
        // setActivePlan(plan[activeUser?.plan-1].label)
        setActiveUser(data)
    }
    const plan = [
      {
        id:'1',
        label: 'Weight Gain',
        isSelected: false
      },
      {
        id:'2',
        label: 'Weight Loss',
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
        <View style={{flexDirection:'row',marginTop:10,alignItems:'center'}}>
        <Text style={{fontSize:16,alignSelf:'center',color:'#01882A'}}>You have have selected:</Text>
        <Text style={{fontSize:16,color:'#01882A',fontWeight:'700'}}> {activePlan}</Text>
        </View>
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