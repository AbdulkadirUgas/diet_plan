import { StyleSheet, Text,Image, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Icon } from "@rneui/themed";

const Plan = () => {
    const foods = [1,23,1,3,1,2,1,3,1,3,4]
  return (
    <View style={styles.container}>
      
      <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
        <Image source={require('./assets/logo.png')} style={{height:100,width:100,resizeMode:'contain'}} />
        <View style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:50,fontWeight:'900',color:'#01882A'}}>EASY</Text>
            <Text style={{fontSize:30,fontWeight:'200',color:'#FEC111'}}>DIET</Text>
        </View>
      </View>

      <View style={{backgroundColor:'#f5f5f5',flex:1,marginTop:20,paddingTop:30,borderTopRightRadius:40,borderTopLeftRadius:40,}}>
      <ScrollView>
      {
        foods.map((_,index) => (
            <FoodCard key={index}/>
        ))
      }
      </ScrollView>
      </View>
    </View>
  )
}
const FoodCard = () => (
    <TouchableOpacity activeOpacity={0.5} style={styles.food_card}>
        <Image source={require('./assets/food.png')} style={{height:100,width:100,resizeMode:'contain'}} />
        <View style={{}}>
            <Text style={{fontSize:20,fontWeight:'600',color:'#01882A'}}>Breakfast</Text>
            <Text style={{fontSize:14,marginTop:4,color:'#004'}}>Speacial Salad</Text>
        </View>
        <TouchableOpacity style={styles.bookmark_icon}>
        <Icon name='heart' type='ionicon' color='#fff' size={20}/>
        </TouchableOpacity>
    </TouchableOpacity>
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
        backgroundColor:'#FEC111',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    }
})