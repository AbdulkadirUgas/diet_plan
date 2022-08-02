import { StyleSheet,RefreshControl, Text,Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Icon } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { serverIP } from '../Constants';
import Header from './Components/Header';

const Exercise = ({navigation}) => {
    const [meals,setMeals] = useState([]);
    const [activeUser,setActiveUser] = useState([]);
    const [refresh,setRefresh] = useState(false)
    useEffect(() => {
      loadUserData()
  },[])
    useEffect(() => {
      fetchData()
    },[activeUser])
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('userInfo')
      const data = userData != null ? JSON.parse(userData) : null
      setActiveUser(data)
    }

    const fetchData = () => {
        var formData = new FormData();
        formData.append('userID', activeUser?.userID);
        let url = serverIP+'exercise.php?exercise=getAll'
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
          // console.log(result?.result)
            setMeals(result?.result)
        })
        .catch(error =>{
          console.log('here:'+error)
        })
    }
  return (
    <View style={styles.container}>
    <Header filter='back' title='Exercise' action={()=>{navigation.goBack()}}/>
     

      <View style={{backgroundColor:'#f5f5f5',flex:1,marginTop:20,paddingTop:30,borderTopRightRadius:40,borderTopLeftRadius:40,}}>
      
      {
        meals.length > 0 ?
        <ScrollView>
          {
            meals.map((meal,index) => (
              <ExerciseCard exr={meal} key={meal.mealID}/>
            ))
          }
        </ScrollView>
        :
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator color={"#01882A"} size={100}/>
        </View>
      }
      
      </View>
    </View>
  )
}
const ExerciseCard = ({exr}) => (
    <View style={styles.food_card}>
        <Text style={{fontSize:20,fontWeight:'600',color:'#01882A'}}>{exr.day}</Text>
        {
            exr.exercise.split('|') &&
            exr.exercise.split('|').map((data,index)=>(
                <Text key={index} style={{fontSize:14,marginTop:4,color:'#004',flexWrap:'wrap'}}>{data}</Text>
            ))
        }
        
    </View>
)
export default Exercise

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF'
    },
    food_card:{
        marginLeft:30,
        marginRight:30,
        paddingBottom:20
    },
    bookmark_icon:{
        marginRight:20,
        width:30,
        height:30,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    }
})