import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, Spinner} from 'native-base'
import axios from '../utils/axios';

import socketIOClient from "socket.io-client";

import { AuthContext } from '../context/AuthContext';
import {AccessContext} from '../context/AccessContext'

import UserChat from './Chat/UserChat';
import GroupChat from './Chat/GroupChat';



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function Chat({navigation}){
  const [rend, setRend] = useState(1);

  const [families, setFamilies] = useState([]);
  const [groupchat, setGroupchat] = useState([]);
  const [singlechat, setSinglechat] = useState([]);

  const {IsKidAccount} = useContext(AuthContext);
  const {setisLoggedIn} = useContext(AccessContext)

  const [us, setUs] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  // var ws = new WebSocket(`wss://infinite-connect.herokuapp.com/ws/chatroom/gib`)

  // useEffect(() => {
  //   console.log("hellooooo");

  //   ws.onopen = () => {
  //     console.log("COnnected to the server");
  //   };
  //   ws.onmessage = (e) => {
  //     // a message was received
  //     console.log("helllllllllllllllll",e.data);
  //   };

  //   ws.onerror = (e) => {
  //     console.log("error connecting: ", e)
  //   };
  // }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFamilies();
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const getFamilies = async() => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);
    let token;
    let username;
    if(IsKidAccount){
      token = JSON.parse(userToken).result.token;
      username= JSON.parse(userToken).result.kid.user
      
    }else{
      token = JSON.parse(userToken).result.token;
      username= JSON.parse(userToken).result.user_data.username
    }
    setUs(username);
    await axios.get(`/chat-api/last-message/`, { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        console.log('resulst chat ',res.data);
        let group = [];
        let single = [];
        for (let index = 0; index < res.data.chats.length; index++) {
          const element = res.data.chats[index];
          if(element.is_group){
            console.log("we have a group chat");
            group.push(element);
          }else{
            console.log("single chat")
            single.push(element);
          }
          
        }
        console.log(single)
        setRefreshing(false);
        setGroupchat(group);
        setSinglechat(single);
        // setFamilies(res.data.family_members);
        // setLoad(false)
      }).catch(err=>{
        setRefreshing(false);
        console.log(err.request);
      })
  }


  useEffect(() => {
    setRefreshing(true);
    getFamilies();

    const willFocusSubscription = navigation.addListener('focus', () => {
      getFamilies();
  });

  return willFocusSubscription;

  }, [])  

  const onSignOut = async() => {
    await AsyncStorage.removeItem('userToken');
    setisLoggedIn(false);
  }


  const putBtnStyles = (e) => {
    if(e == rend){
      return { width: '50%', backgroundColor: '#28A7E3', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 7 }
    }else{
      return { width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 7 }
    }
  }

  const putTxt = (e) => {
    if(e == rend){
      return { color: 'white', fontSize: 16, fontWeight: 'bold' }
    }else{
      return { color: '#28A7E3', fontSize: 16, fontWeight: 'bold' }
    }
  }

  const putRend = () => {
    if(rend == 1){
      return <UserChat navigation={navigation} chats= {singlechat} onSignOut={onSignOut} us={us}/>
    }else{
      return <GroupChat navigation={navigation} chats={groupchat}/>
    }
  }

  return(
    <ScrollView 
    contentContainerStyle={styles.scrollView}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
      <View style={styles.main}>
        <View style={styles.header}>
          <TouchableOpacity style={putBtnStyles(1)} onPress={() => setRend(1)}>
            <Text style={putTxt(1)}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={putBtnStyles(2)} onPress={() => setRend(2)}>
            <Text style={putTxt(2)}>Group Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.br} />
        <View style={styles.body}>
          {putRend()}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10
  },
  br: {
    width: '100%',
    height: 1,
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: 1
  },
  body: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
 
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})