import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import UserChat from './Chat/UserChat';
import GroupChat from './Chat/GroupChat';

export default function Chat(){
  const [rend, setRend] = useState(1);

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
      return <UserChat />
    }else{
      return <GroupChat />
    }
  }

  return(
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
  }
})