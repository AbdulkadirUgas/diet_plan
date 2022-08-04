import { StyleSheet, Text,Image, View, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Icon } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { serverIP } from '../Constants';

const Favorite = () => {
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
        let url = serverIP+'user.php?user=getFav'
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

    const removeFav = (index) => {
      let newArr = [...meals];
      newArr[index].isFav = !newArr[index].isFav
    //   setMeals(newArr)
      updateFavorite(newArr[index].mealID)
    }
    const updateFavorite = (mealID) => {
      var formData = new FormData();
        formData.append('userID', activeUser?.userID);
        formData.append('mealID', mealID);
        let url = serverIP+'user.php?user=removeFav'
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

    const createAlert = (index) =>
    Alert.alert(
      "Are you sure you want to remove "+meals[index]?.name,
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>  removeFav(index)}
      ]
    );
  return (
    <View style={styles.container}>
      
      <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
        <Image source={require('./assets/logo.png')} style={{height:100,width:100,resizeMode:'contain'}} />
        <View style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:50,fontWeight:'900',color:'#01882A'}}>Meal</Text>
            <Text style={{fontSize:30,fontWeight:'200',color:'#FEC111'}}>plan</Text>
        </View>
      </View>

      <View style={{backgroundColor:'#f5f5f5',flex:1,marginTop:20,paddingTop:30,borderTopRightRadius:40,borderTopLeftRadius:40,}}>
      {
        meals.length > 0 ? 
        <ScrollView>
      {
        
        meals.map((meal,index) => (
            <FoodCard removeFav={()=>createAlert(index)} meal={meal} key={meal.mealID}/>
        ))
      }
      </ScrollView>
      :
        (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,color:'black'}}>No favorite meal found</Text>
            </View>
        )
      }
      </View>
    </View>
  )
}
const FoodCard = ({meal,removeFav}) => (
    <View style={styles.food_card}>
        <Image source={{uri:serverIP+'/images/'+meal.image}} style={{height:100,width:100,resizeMode:'contain'}} />
        <View style={{flex:0.9}}>
            <Text style={{fontSize:20,fontWeight:'600',color:'#01882A'}}>{meal.type}</Text>
            <Text style={{fontSize:14,marginTop:4,color:'#004'}}>{meal.name}</Text>
        </View>
        <TouchableOpacity onPress={()=>{removeFav()}} activeOpacity={0.5} style={[styles.bookmark_icon]}>
        <Icon name={'trash'} type='ionicon' color={'#fff'} size={20}/>
        </TouchableOpacity>
    </View>
)
export default Favorite

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF'
    },
    food_card:{
        flex:1,
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
        backgroundColor:'#FEC111',
        justifyContent:'center',
        alignItems:'center'
    }
})