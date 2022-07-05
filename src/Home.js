import { StyleSheet, Text,Image, View, TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import Header from './Components/Header'

const Home = ({navigation}) => {
  const [visible,setVisibility] = useState(false)
  const showLogout = () =>(
    <View>
      <Text style={{fontSize:20,fontWeight:'800',color:'#01882A'}}>Logout</Text>
    </View>
  )
  return (
    <View style={styles.container}>
    <Header filter='Home' title='Home' action={()=>{console.log('logout')}}/>
    

      <View style={{backgroundColor:'#f5f5f5',flex:1,marginTop:20,paddingTop:20,borderTopRightRadius:40,borderTopLeftRadius:40,alignItems:'center'}}>
      <Text style={{fontSize:20,fontWeight:'800',color:'#01882A'}}>What's your primary goal?</Text>

      <View style={{marginTop:30,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate('plan')}} style={styles.card}>
            <View style={styles.card_icon}>
            <Image source={require('./assets/plan.png')} style={{height:60,width:60,resizeMode:'contain'}} />
            </View>
            <Text style={{marginTop:3, fontSize:20,color:'#01882A'}}>My Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('wng')}} activeOpacity={0.5} style={[styles.card,{marginLeft:20}]}>
            <View style={styles.card_icon}>
            <Image source={require('./assets/weight_mng.png')} style={{height:60,width:60,resizeMode:'contain'}} />
            </View>
            <Text style={{marginTop:3, fontSize:20,color:'#01882A'}}>Weight</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={() => {navigation.navigate('bmi')}} activeOpacity={0.5} style={styles.card}>
            <View style={styles.card_icon}>
            <Image source={require('./assets/bmi.png')} style={{height:60,width:60,resizeMode:'contain'}} />
            </View>
            <Text style={{marginTop:3, fontSize:20,color:'#01882A'}}>BMI</Text>
        </TouchableOpacity>
        <TouchableOpacity navigation={navigation} onPress={() => {navigation.navigate('feedback')}} activeOpacity={0.5} style={[styles.card,{marginLeft:20}]}>
            <View style={styles.card_icon}>
            <Image source={require('./assets/feedback.png')} style={{height:60,width:60,resizeMode:'contain'}} />
            </View>
            <Text style={{marginTop:3, fontSize:20,color:'#01882A'}}>Feedback</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF'
    },
    card:{
        width:170,
        height:170,
        backgroundColor:'#FFF',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    },
    card_icon:{
        width:100,
        height:100,
        backgroundColor:'#01882A',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    }
})