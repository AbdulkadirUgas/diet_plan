import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Components/Header'

const Motivation = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Header filter='back' title='Motivation' action={()=>{navigation.goBack()}}/>
      <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:25}}>
      <Text style={styles.text}>to change your body you must first change your mind!</Text>
      </View>
    </View>
  )
}

export default Motivation

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF'
    },
    text:{
        fontSize:36,
        fontWeight:'500',
        color:'black',
    }
})