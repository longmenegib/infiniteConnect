import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

export default function ReportIssue(){
  const navigation = useNavigation();

  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>Report issue</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={{ textAlign: 'left', color: '#424242' }}>Describe your issue in detail</Text>
        <TextInput
          multiline
          placeholder='Describe your issue'
          style={styles.textarea}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 30, marginRight: 7, height: 30, borderRadius: 15, backgroundColor: '#15B715', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('./../../Assets/icons/picture.png')} style={styles.back} />
            </View>
            <Text style={{ color: '#999' }}>Attachment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.send}>
            <Text style={{ color: 'white', fontSize: 15, marginRight: 7 }}>Send</Text>
            <Image source={require('./../../Assets/icons/plane.png')} style={styles.back} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.callbtn}>
          <Image source={require('./../../Assets/icons/phone.png')} style={[styles.back, { width: 25, height: 25, marginRight: 10 }]} />
          <Text style={{ color: 'white', fontSize: 17 }}>Emergency Call</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main:{
    flex: 1,
    backgroundColor: 'white',
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
    paddingHorizontal: '5%',
    justifyContent: 'center'
  },
  textarea: {
    width: '100%',
    minHeight: 200,
    maxHeight: 250,
    backgroundColor: '#eff8fd',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28A7E3',
    textAlignVertical: 'top',
    padding: 10,
    marginTop: 5,
    color: '#424242'
  },
  send: {
    backgroundColor: '#15B715',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    flexDirection: 'row'
  },
  callbtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15B715',
    marginTop: 45,
    height: 50,
    borderRadius: 40
  }
})