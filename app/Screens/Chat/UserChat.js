import React, { useState, useContext } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'native-base'
import axios from '../../utils/axios';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment'

export default function UserChat({navigation, chats, onSignOut, us}){

  
  const {IsKidAccount} = useContext(AuthContext);

  const gotoChat = async(i)=>{
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(JSON.parse(userToken).result);

    let user = IsKidAccount ? JSON.parse(userToken).result.kid.user: JSON.parse(userToken).result.user_data.username
    let userid = IsKidAccount ? JSON.parse(userToken).result.kid.id: JSON.parse(userToken).result.user_data.id
    
    let me = i.participants.find((el)=>{
      return el !== user
    })
    console.log(me);
    navigation.navigate("GroupConvo", {chat: i, user: user, userid: userid, chattitle: me})
  }

  const parti = (val)=>{
    let me = val.find((el)=>{
      return el !== us
    })
    return me;
  }
  


  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <ScrollView style={styles.main}>
        {chats.length<1 &&
          <View style={styles.maino}>
            <Image source={require('../../Assets/icons/error.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ marginTop: 15, fontWeight: 'bold', color: 'gray', fontSize: 18 }}>No conversation</Text>
            
          </View>
        }
        {chats.map((i, j) => {
          return (
            
            <TouchableOpacity key={j} onPress={() => gotoChat(i)} style={styles.convo}>
              <Image source={require('./../../Assets/person.jpg')} style={styles.pic} />
              <View style={styles.info}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#424242' }}>{parti(i.participants)}</Text>
                <Text style={{ color: '#424242' }}>{i.last_message_content}</Text>
              </View>
              <View style={{ width: 40, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: '#424242' }}>{moment(i.last_message_date).format("HH:mm")}</Text>
                {/* <View style={styles.badge}>
                  <Text style={{ color: 'white', fontSize: 12 }}>1</Text>
                </View> */}
              </View>
            </TouchableOpacity>
           
           
          )
        })}
        <View style={{ width: 10, height: 100 }} />
      </ScrollView>
      {IsKidAccount ? 
      <TouchableOpacity onPress={() => navigation.navigate('SelectChat', {chatlist: chats})} style={styles.fab}>
      <Image source={require('./../../Assets/icons/user.png')} style={{ width: 35, height: 35 }} />
    </TouchableOpacity>
    :
    <TouchableOpacity style={styles.fab} onPress={()=> onSignOut()}>
    <Icon type='AntDesign' name='logout' style={{color: '#fff', fontSize: 26 }} />
  </TouchableOpacity>
    }
      
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 7
  },
  convo: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  pic: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  info: {
    flex: 1,
    marginLeft: 15
  },
  badge: {
    backgroundColor: '#28A7E3',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  line: {
    marginHorizontal: 5,
    backgroundColor: '#dbdbdb',
    height: 0.5,
    marginBottom: 15
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 15,
    backgroundColor: '#28A7E3',
    position: 'absolute',
    bottom: 35,
    right: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  maino: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
});