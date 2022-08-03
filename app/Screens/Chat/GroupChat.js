import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "fetch_messages"; // Name of the event
const SOCKET_SERVER_URL = "https://infinite-connect.herokuapp.com/chatroom";

export default function GroupChat({navigation, chats}){

  const {IsKidAccount} = useContext(AuthContext);

  const gotoChat = async(i)=>{
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(JSON.parse(userToken).result);
    let user = IsKidAccount ? JSON.parse(userToken).result.kid.user: JSON.parse(userToken).result.user_data.username
    let userid = IsKidAccount ? JSON.parse(userToken).result.kid.id: JSON.parse(userToken).result.user_data.id
    navigation.navigate("GroupConvo", {chat: i, user: user, userid: userid, chattitle: i.chat_name})
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
            // <>
            <TouchableOpacity key={j} onPress={() => gotoChat(i)} style={styles.convo}>
              <Avatar title={'Group Name'} width={60} height={60} rounded source={require('./../../Assets/person.jpg')} avatarStyle={{ borderRadius: 30 }} />
              <View style={styles.info}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{i.chat_name || 'Family Group'}</Text>
                <Text>{i.last_message_content}</Text>
                <View style={styles.samples}>
                  {/* <Image source={require('./../../Assets/person.jpg')} style={styles.sub} />
                  <Image source={require('./../../Assets/person.jpg')} style={styles.sub} />
                  <Image source={require('./../../Assets/person.jpg')} style={styles.sub} /> */}
                  <Text style={{ color: '#dbdbdb', fontSize: 10 }}>{i.participants.length} members</Text>
                  {/* <View style={[styles.sub, { backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }]}>
                    <Text style={{ color: '#dbdbdb', fontSize: 10 }}>{i.participants.length}</Text>
                  </View> */}
                </View>
              </View>
              <View style={{ width: 40, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 12, color: '#424242' }}>{moment(i.last_message_date).format("HH:mm")} </Text>
                {/* <View style={styles.badge}>
                  <Text style={{ color: 'white', fontSize: 12 }}>1</Text>
                </View> */}
              </View>
            </TouchableOpacity>
            // {/* {(j !== (convos.length - 1)) && (<View style={styles.line} />)}
            // </> */}
          )
        })}
        <View style={{ width: 10, height: 100 }} />
      </ScrollView>
      {IsKidAccount ? 
         <TouchableOpacity onPress={() => navigation.navigate('NewGroupChat')} style={styles.fab}>
         <Image source={require('./../../Assets/icons/group.png')} style={{ width: 35, height: 35 }} />
       </TouchableOpacity>
      :
      <></>
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
    height: 65,
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  info: {
    flex: 1,
    marginLeft: 15,
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
  samples: {
    flexDirection: 'row',
    marginTop: 5,
  },
  sub: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: -3,
    borderWidth: 1,
    borderColor: '#dbdbdb'
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