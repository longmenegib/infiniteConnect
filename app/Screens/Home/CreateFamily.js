import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

export default function CreateFamily(){
  const navigation = useNavigation();

  const handleCreate = () => {
    navigation.navigate('InitFamily');
  }

  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>Create a family</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 35 }}>
          <TouchableOpacity style={styles.pic}>
            <Image source={require('./../../Assets/icons/camera.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#28A7E3', marginTop: 60, marginLeft: -25 }}>
            <Image source={require('./../../Assets/icons/wedit.png')} style={styles.back} />
          </View>
        </View>
        <View style={styles.drow}>
          <Text style={styles.label}>Name of family</Text>
          <TextInput
            placeholder='Name of family'
            style={styles.input}
          />
        </View>
        <View style={styles.drow}>
          <Text style={styles.label}>Add address</Text>
          <TextInput
            placeholder='Address'
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={() => handleCreate()} style={styles.btn}>
          <Text style={{ color: 'white', fontSize: 18 }}>Create</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fdfdfd'
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  drow: {
    marginBottom: 20,
    width: '85%',
  },
  label: {
    color: '#AAAAAA',
    fontSize: 12
  },
  input: {
    width: '100%',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 0.7,
    backgroundColor: 'transparent'
  },
  btn: {
    width: '85%',
    height: 56,
    backgroundColor: '#15B715',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 218,
  }
})