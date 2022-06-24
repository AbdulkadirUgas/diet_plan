import React from 'react'
import {TouchableOpacity,SafeAreaView,StyleSheet, Text} from 'react-native';
// import { Icon } from 'react-native-elements'
import { Icon } from '@rneui/base'

function CustomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const bottomMenu = [
    {icon_outline:'home-outline',icon_filled:'home',size:20},
    {icon_outline:'restaurant-outline',icon_filled:'restaurant',size:22},
    {icon_outline:'heart-outline',icon_filled:'heart',size:24},
    {icon_outline:'person-outline',icon_filled:'person',size:24}]

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView style={{flexDirection: 'row',marginLeft:25,marginRight:25,marginTop:10,marginBottom:10}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const icon_filled = bottomMenu[index].icon_filled
        const icon_outline = bottomMenu[index].icon_outline
        const size = bottomMenu[index].size

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          
          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onLongPress={onLongPress}
            style={[{justifyContent:'center',alignItems:'center',paddingTop:0,paddingBottom:0},isFocused ? styles.activeMenu : styles.inActiveMenu,index === bottomMenu.length -1 ? {marginRight:0}: {marginRight:10}]} key={index}>
            <Icon
              name={isFocused ? icon_filled : icon_outline}
              type='ionicon'
              color={isFocused ? '#01882A' : 'black'}
              size={size}
              />
            <Text style={{marginLeft:10, color:isFocused ? '#01882A' : 'black'}}>{label}</Text>
          </TouchableOpacity>
          
        );
      })}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
      backgroundColor:'#FFF',
      height:60,
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingLeft:25,
      paddingRight:25,
  },
  activeMenu:{
    //   flex:1,
    //   backgroundColor:'#063252',
      marginRight:0,
  },
  inActiveMenu:{
      flex:0.5,
  },
  activeIcon:{
      color:'#FFD100',
  },
})

export default CustomTabBar