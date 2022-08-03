import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';


export default function Emergency(){
  return(
    <View style={styles.main}>
       <TouchableOpacity style={styles.callbtn}
       onPress={()=> Linking.openURL(`tel: 991`)} >
          <Image source={require('./../Assets/icons/phone.png')} style={[styles.back, { width: 25, height: 25, marginRight: 10 }]} />
          <Text style={{ color: 'white', fontSize: 17 }}>Emergency Call</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  callbtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15B715',
    marginTop: 15,
    height: 50,
    borderRadius: 40
  },
  back: {
    width: 20,
    height: 20
  },
});