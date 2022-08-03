import React, {useState, useEffect} from 'react'
import axios from '../../utils/axios';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner, Icon} from 'native-base';

export default function SelectChat({navigation, route}) {
    const convos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const {chatlist} = route.params;
    const [families, setFamilies] = useState([]);
    const [selectedid, setSelectedid] = useState(null);
    const [creating, setCreating] = useState(false);

  const getFamilies = async() => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);
    let token = JSON.parse(userToken).result.token;
    await axios.get('/user-api/kids/family-members', { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        console.log('this is my family ',res.data);
        setFamilies(res.data.family_members);
        // setLoad(false)
      }).catch(err=>{
        console.log(err.request);
      })
  }

  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  useEffect(() => {
    getFamilies()
  }, [])  

  const select = (i)=>{
      setSelectedid(i.username);
  }

  const createNewChat = async()=>{
    console.log('chatlist: ', chatlist)
    let checkMember = chatlist.filter(el => el.chat_name === selectedid)
    console.log(checkMember);
    // return;
  
    setCreating(true);
    if(!selectedid){
        return Alert.alert("Error","Select a participant")
    }
    let userToken = await AsyncStorage.getItem('userToken');
   
    let token = JSON.parse(userToken).result.token;
    let id=JSON.parse(userToken).result.kid.user
    if(checkMember){
      navigation.replace("GroupConvo", {chat: checkMember[0], user: JSON.parse(userToken).result})
    }else{
      await axios.post('/chat-api/create-chat/', {participants: [selectedid, id], name: selectedid}, { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        console.log('Chat created', res.data);
        setCreating(false)
        navigation.replace("GroupConvo", {chat: res.data, user: JSON.parse(userToken).result})
      }).catch(err=>{
        console.log(err.request);
        setCreating(false)
        Alert.alert("Try later","Error creating chat");
      })
    }
  }


    return(
      <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
            <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
            <Text style={{ color: '#424242' }}>Select Chat</Text>
            </View>
        </View>
        <ScrollView style={styles.main}>
          {families.map((i, j) => {
            return (
              // <>
              <TouchableOpacity key={j}
            //   onLongPress={()=> select(i)}
               onPress={() => select(i)} 
              style={[styles.convo, i.username===selectedid ? {backgroundColor: 'rgba(0,0,0,0.1)'} : {}]}>
                <Image source={require('./../../Assets/person.jpg')} style={styles.pic} />
                <View style={styles.info}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#424242' }}>{i.username}</Text>
                  <Text style={{ color: '#424242' }}>{i.phone}</Text>
                </View>
              </TouchableOpacity>
              // {/* {(j !== (convos.length - 1)) && (<View style={styles.line} />)} */}
              // </>
            )
          })}
          <View style={{ width: 10, height: 100 }} />
        </ScrollView>
        <TouchableOpacity onPress={() => createNewChat()} style={styles.fab}>
          {creating ? 
          <Spinner color="white"/>
          :
          <Image source={require('./../../Assets/icons/user.png')} style={{ width: 35, height: 35 }} />
        }
          
        </TouchableOpacity>
      </ImageBackground>
    )
}


const styles = StyleSheet.create({
    main: {
      flex: 1,
      paddingTop: 7
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
    convo: {
      flexDirection: 'row',
      height: 60,
      justifyContent: 'space-between',
      marginBottom: 10,
      paddingHorizontal: 5,
      alignItems: 'center'
    },
    pic: {
      width: 60,
      height: 60,
      borderRadius: 30
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
    }
  });
