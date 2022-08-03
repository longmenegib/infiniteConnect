import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat, Avatar } from 'react-native-gifted-chat';
import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {io} from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "fetch_messages"; // Name of the event
const ENDPOINT = "http://infinite-connect.herokuapp.com/";

import { AuthContext } from '../../context/AuthContext';

export default function GroupConvo({navigation, route}) {
  // const navigation = useNavigation();
  // const [messages, setMessages] = useState([]);
  const {chat, user, userid, chattitle} = route.params;
  const {IsKidAccount} = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);

  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  var ws = new WebSocket(`wss://infinite-connect.herokuapp.com/ws/chatroom/gib`)
 
  useEffect(() => {
    console.log(user);
    const fetch_messages = ()=>{
      console.log("hellooooo", chat.chat_id || chat.id);
   
      // console.log(user)
  
      const apiCall = {
        command: "fetch_messages",
        username: user,
        chatId: chat.chat_id || chat.id
      };
      ws.onopen = () => {
        console.log("COnnected to the server");
        ws.send(JSON.stringify(apiCall));
      };
      ws.onmessage = (e) => {
        // a message was received
        console.log(e.data);
        
        if(JSON.parse(e.data).command === 'messages'){
          let sms = [];
          console.log("getttttt")
          for (let index = 0; index < JSON.parse(e.data).messages.length; index++) {
            const element = JSON.parse(e.data).messages[index];
            let newsms = {
              _id: element.id,
              text: element.content,
              createdAt: moment(element.timestamp),
              user: {
                _id: element.author === user ? userid : 2,
                name: element.author
              }
            }
            sms.push(newsms);
            console.log('message new: ',newsms);
          }
          setMessages(sms);
        }else{
          console.log("sennndddd")
          let mes = JSON.parse(e.data).message;
         
          let newsms = [{
            _id: mes.id,
            text: mes.content,
            createdAt: moment(mes.timestamp),
            user: {
              _id: mes.author===user ? userid : 2,
              name: mes.author
            }
          }]
          // setMessages(previousMessages => GiftedChat.append(previousMessages, newsms))
          // sms.push(newsms);
        }
        setLoaded(true);
      };
  
      ws.onerror = (e) => {
        console.log("error connecting: ", e)
      };
    }
    fetch_messages();
  }, []);

  const onSend = useCallback((messae = []) => {
    console.log(messae)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messae))
    const apiSend = {
      command: "new_message",
      from: user,
      chatId: chat.chat_id || chat.id,
      message: messae[0].text
    };
    // ws.onopen = () => {
      console.log("COnnected to the server");
      ws.send(JSON.stringify(apiSend));
      ws.onmessage = (e)=>{
        console.log(e.data);
      }
    // };username
   
    // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);
  

  const putAvatar = (props) => {
    return(
      <Avatar
        {...props}
      />
    )
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>{chattitle}</Text>
        </View>
      </View>
      <View style={styles.body}>

      {!loaded &&
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'gray'}}>Loading...</Text>
      </View>}

        {/* {messages.length<1 && loaded &&
        <View>
          <Text style={{color: 'gray'}}>No messages yet</Text>
        </View>
        } */}

        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          renderAvatar={putAvatar}
          renderAvatarOnTop = {true}
          renderUsernameOnMessage
          bottomOffset={26}
          onPressAvatar={console.log}
          showAvatarForEveryMessage
          user={{
            _id: userid,
            name: user,
            // avatar: 'https://placeimg.com/480/480/people',
          }}
        />
        {/* } */}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: 40,
    width: '100%',
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  back: {
    width: 20,
    height: 20
  },
  body: {
    flex: 1,
    backgroundColor: 'white'
  }
})