import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Components/Header'

const Forgot = ({navigation}) => {
  return (
    <View>
        <Header filter='back' title='Forgot passowrd' action={()=>{navigation.goBack()}}/>
    </View>
  )
}

export default Forgot

const styles = StyleSheet.create({})