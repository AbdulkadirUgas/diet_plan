import { Alert, Image, Modal, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/base'
import { serverIP } from '../Constants';
import Header from './Components/Header';

const Feedback = ({navigation}) => {
    const [activeUser,setActiveUser] = useState({});
    const [message,setMessage] = useState('');
    const [succes,setSuccess] = useState(false);
    useEffect(() => {
        loadUserData()
    },[])
    const loadUserData = async () => {
        const userData = await AsyncStorage.getItem('userInfo')
        const data = userData != null ? JSON.parse(userData) : null
        setActiveUser(data)
    }
    const displayMessage = (title,message) => {
      Platform.OS === 'android' ?
      ToastAndroid.show(message,ToastAndroid.LONG):
      Alert.alert(title,message,'OK')
    }
    const renderModal = () => (
      <Modal animationType='slide'
          transparent={true}
          visible={succes}>
          <ShowSuccess navigation={navigation}/>
      </Modal>
  )

  return (
    <View style={styles.container}>
    {renderModal()}
    <Header filter='back' title='Feedback' action={()=>{navigation.goBack()}}/>
      {/* <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',marginTop:40}}>
        <Image source={require('./assets/logo.png')} style={{height:100,width:100,resizeMode:'contain'}} />
        <View style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:50,fontWeight:'900',color:'#01882A'}}>Weight</Text>
            <Text style={{fontSize:30,fontWeight:'200',color:'#FEC111'}}>management</Text>
        </View>
      </View> */}
      <View style={{backgroundColor:'#f5f5f5',flex:1,marginTop:20,paddingTop:30,borderTopRightRadius:40,borderTopLeftRadius:40,}}>
      
      <View style={{backgroundColor:'#FFF',marginTop:20,marginLeft:20,marginRight:20,padding:30,borderRadius:20}}>
        <Text style={{fontSize:20,fontWeight:'700',color:'#01882A'}}>Name: {activeUser?.name && activeUser?.name}</Text>
        <View style={{marginTop:10,borderWidth:1,padding:5,borderColor:'#01882A',borderRadius:10,height:160}}>
        <TextInput
              style={styles.inputField}
              placeholder="Comment"
              placeholderTextColor='black'
              onChangeText = {(value) => {setMessage(value)}}
              returnKeyType='next'
              multiline={false}
              value={message}
              keyboardType='default'
              autoCorrect={false}
            />
        </View>
        <TouchableOpacity
          onPress={() => {
            message === '' ? displayMessage('Error','Please enter a feedback') : setSuccess(true)
          }}
          activeOpacity={0.5}
          style={styles.loginStyle}>
          <Text style={styles.loginText}>Send</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}



export default Feedback
const ShowSuccess = ({navigation}) =>{
  return (
    <View style={{flex:1,backgroundColor:'black',justifyContent:'center',alignItems:'center',opacity:0.9}}>
    <View style={{backgroundColor:'#FFF',padding:20,borderRadius:10}}>
    <Text style={{fontSize:20,color:'#01882A'}}>Thanks for your feedback</Text>
    <Text style={{marginTop:10}}>You will get our response as soon as possible</Text>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginTop:20, backgroundColor:'#01882A',width:40,height:40,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:50}}>
    <Icon
        name='close'
        type='ionicon'
        color='#FFF'
        size={20}
        />
    </TouchableOpacity>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF'
    },
    inputField:{
        padding:0,
        color:'black',
        fontSize: 16,
    },
    loginStyle: {
        marginTop: 20,
        height: 40,
        backgroundColor: '#01882A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        shadowOffset:{
            height:4,
            width:4
        },
        shadowColor:'#000',
        shadowOpacity:0.1,
        elevation:5
      },
      loginText: {
        color: '#FFF',
        // fontFamily: 'Roboto-Bold',
        fontSize: 18,
      },
})