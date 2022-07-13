import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{ useState} from 'react'
import { Icon, Image } from "@rneui/themed";

const Header = ({navigation,filter,action,title}) => {
    const [visible,setVisibility] = useState(false)
    return(
        <View>
        {
            filter === 'Home' ?
            <TouchableOpacity activeOpacity={1} onPress = {() => setVisibility(false)} style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',marginTop:40}}>
            <View style={{flex:1,flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
            <Image source={require('./../assets/logo.png')} style={{height:100,width:100,resizeMode:'contain'}} />
            <View style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:50,fontWeight:'900',color:'#01882A'}}>Meal</Text>
                <Text style={{fontSize:30,fontWeight:'200',color:'#FEC111'}}>plan</Text>
            </View>
            </View>

            {/* <TouchableOpacity onPress={() => setVisibility(true)} activeOpacity={0.5} style={{marginRight:20}}>
                <Icon name='ellipsis-vertical' type='ionicon' color='#000' size={24}/>
            </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => action()} style={{position:'absolute',backgroundColor:'#01882A',top:15,right:0,height:50,width:100,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'600',color:'#FFF'}}>Logout</Text>
                </TouchableOpacity> */}
            </TouchableOpacity> 
            :
            <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',marginTop:40}}>
                <TouchableOpacity onPress={() => action()} activeOpacity={0.5} style={{marginLeft:20}}>
                <Icon name='arrow-back-outline' type='ionicon' color='#000' size={24} />
                </TouchableOpacity>
                <Text style={{fontSize:24,fontWeight:'500',color:'#01882A'}}>{title}</Text>
                <Icon name='ellipsis-vertical' type='ionicon' color='#000' size={24} style={{marginRight:20,opacity:0}}/>
            </View>
        }
        </View>
        
    )
}

export default Header

const styles = StyleSheet.create({

})