import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'native-base'

import Home from '../Screens/Home';
import PersonalInformation from '../Screens/PersonalInformation';
import Chat from '../Screens/Chat';
import Notifications from '../Screens/Notifications';
import Emergency from '../Screens/Emerrgency';

import {AccessContext} from '../context/AccessContext';
import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

const MainTab = () => {

  // const {IsKidAccount, setIskIdAccount} = useContext(AuthContext);

  // if(IsKidAccount){
  //   return(
  //     <Chat />
  //   )
  // }

  return (
    <Tab.Navigator
      screenOptions={{headerShown:false}}
      
      activeColor='#e91e63'
      barStyle={{backgroundColor: '#340744', height: 45, alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}
      tabBarOptions={{
        showLabel: true,
        style: {
          elevation: 0,
          height: 60,
          backgroundColor: '#fff',
          justifyContent:'center',
        },
        tabStyle:{
            marginBottom:15
        },
        
      }}
      >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return(
              <Icon type='AntDesign' name='home' style={{color: focused ? '#28A7E3' : 'gray', fontSize: 26 }} />
            )
          },
          
        }}
      />
      
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({focused}) => {
            return(
              <Icon type='AntDesign' name='message1' style={{color: focused ? '#28A7E3' : 'gray', fontSize: 26 }} />
            )
          },
          
        }}
      />
    
      <Tab.Screen
        name="Emergency"
        component={Emergency}
        options={{
          tabBarIcon: ({focused}) => {
            return(
              <Icon type='MaterialCommunityIcons' name='phone' style={{color: focused ? '#28A7E3' : 'gray', fontSize: 26 }} />
            )
          },
          
        }}
      />

      <Tab.Screen
        name="My"
        component={PersonalInformation}
        options={{
          tabBarIcon: ({focused}) => {
            return(
              <Icon type='AntDesign' name='user' style={{color: focused ? '#28A7E3' : 'gray', fontSize: 26 }} />
            )
          },
          
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 1,
  },
  
});
