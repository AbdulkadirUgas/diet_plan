import { StyleSheet, Text,Image, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Icon } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { serverIP } from '../Constants';
import Header from './Components/Header';

const Plan = ({navigation}) => {
    const [meals,setMeals] = useState([]);
    const [activeUser,setActiveUser] = useState([]);
    
    useEffect(() => {
      loadUserData()
      .then(fetchData())
    },[meals])
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('userInfo')
      const data = userData != null ? JSON.parse(userData) : null
      setActiveUser(data)
    }

    const fetchData = () => {
        var formData = new FormData();
        formData.append('userID', activeUser?.userID);
        let url = serverIP+'meal.php?meal=getAll'
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
            setMeals(result?.result)
        })
        .catch(error =>{
          console.log(error)
        })
    }

    const changeFav = (index) => {
      let newArr = [...meals];
      newArr[index].isFav = !newArr[index].isFav
      setMeals(newArr)
      newArr[index].isFav ? updateFavorite('add',newArr[index].mealID) : updateFavorite('remove',newArr[index].mealID)
    }
    const updateFavorite = (status,mealID) => {
      var formData = new FormData();
        formData.append('userID', activeUser?.userID);
        formData.append('mealID', mealID);
        let filter = status === 'add' ? 'addFav' : 'removeFav'
        let url = serverIP+'user.php?user='+filter
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
        })
        .catch(error =>{
          console.log(error)
        })
    }
  return (
    <View style={styles.container}>
    <Header filter='back' title='Meal plan' action={()=>{navigation.goBack()}}/>
      {/* <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
        <Image source={require('./assets/logo.png')} style={{height:100,width:100,resizeMode:'contain'}} />
        <View style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:50,fontWeight:'900',color:'#01882A'}}>Meal</Text>
            <Text style={{fontSize:30,fontWeight:'200',color:'#FEC111'}}>plan</Text>
        </View>
      </View> */}

      <View style={{backgroundColor:'#f5f5f5',flex:1,marginTop:20,paddingTop:30,borderTopRightRadius:40,borderTopLeftRadius:40,}}>
      
      {
        meals.length > 0 ?
        <ScrollView>
          {
            meals.map((meal,index) => (
              <FoodCard updateFav={()=>changeFav(index)} meal={meal} key={meal.mealID}/>
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
const FoodCard = ({meal,updateFav}) => (
    <View style={styles.food_card}>
        <Image source={{uri:serverIP+'/images/'+meal.image}} style={{height:100,width:100,resizeMode:'contain'}} />
        <View style={{}}>
            <Text style={{fontSize:20,fontWeight:'600',color:'#01882A'}}>{meal.type}</Text>
            <Text style={{fontSize:14,marginTop:4,color:'#004'}}>{meal.name}</Text>
        </View>
        <TouchableOpacity onPress={()=>{updateFav()}} activeOpacity={0.5} style={[styles.bookmark_icon,meal?.isFav ? {backgroundColor:'#FEC111'}:{borderColor:'#FEC111',borderWidth:1}]}>
        <Icon name={meal?.isFav ? 'heart' : 'heart-outline'} type='ionicon' color={meal?.isFav ? '#fff' : '#FEC111'} size={20}/>
        </TouchableOpacity>
    </View>
)
export default Plan

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF'
    },
    food_card:{
        flexDirection:'row',
        backgroundColor:'white',
        marginLeft:30,
        marginRight:30,
        padding:5,
        borderRadius:10,
        shadowOffset:{
            height:1,
            width:1
        },
        shadowColor:'#000000',
        shadowOpacity:0.1,
        elevation:0.2,
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
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