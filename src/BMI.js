import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BMI = () => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
        <Image source={require('./assets/logo.png')} style={{height:100,width:100,resizeMode:'contain'}} />
        <View style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:50,fontWeight:'900',color:'#01882A'}}>BMI</Text>
            <Text style={{fontSize:30,fontWeight:'200',color:'#FEC111'}}>status</Text>
        </View>
      </View>
      <View style={{backgroundColor:'#f5f5f5',flex:1,marginTop:20,paddingTop:30,borderTopRightRadius:40,borderTopLeftRadius:40,}}>
      <Text style={{fontSize:20,fontWeight:'600',color:'#01882A',alignSelf:'center'}}>Your result</Text>
      <View style={{backgroundColor:'#FFF',marginTop:20,marginLeft:20,marginRight:20,padding:30,borderRadius:20}}>
        <Text style={{fontSize:20,fontWeight:'700',color:'#01882A',alignSelf:'center'}}>Normal</Text>
        <Text style={{fontSize:20,fontWeight:'700',marginTop:5,color:'#F44336',alignSelf:'center'}}>22.2</Text>
        <Text style={{fontSize:20,marginTop:5,alignSelf:'center'}}>You have a normal body weight</Text>
        <Text style={{fontSize:20,marginTop:5,alignSelf:'center'}}>Good job!</Text>
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