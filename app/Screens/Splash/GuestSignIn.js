import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'react-navigation-hooks';

export default function GuestSignIn(){
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(null);

  const handleSignIn = async() => {
    await AsyncStorage.setItem('userToken', 'Infinity');
    navigation.navigate("Home");
  }

  return(
    <View style={styles.main}>
      <StatusBar hidden={false} barStyle='dark-content' backgroundColor={'white'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Image style={styles.logo} source={require('./../../Assets/Logo/icone.png')} />
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>Sign In</Text>
        <View style={styles.section}>
          <TextInput
            value={name}
            onChangeText={e => setName(e)}
            placeholder='Enter your id'
            keyboardType='default'
            style={styles.input}
          />
          {/* <TextInput
            value={phone}
            onChangeText={e => setPhone(e)}
            placeholder='Enter your phone number'
            keyboardType='phone-pad'
            style={styles.input} 
          /> */}
          <TouchableOpacity onPress={() => handleSignIn()} style={[styles.input, { marginTop: 30, alignItems: 'center', justifyContent: 'center', paddingLeft: 0, backgroundColor: '#e7f8e6'}]}>
            <Text style={{ color: '#15B715', fontSize: 17 }}>Sign In & Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ padding: 10, textAlign: 'center', color: '#424242' }}>By signing in, you are agreeing to our <Text style={{ fontWeight: 'bold' }}>Terms of Use</Text> and our <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text></Text>
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
    justifyContent: 'center'
  },
  back: {
    width: 20,
    height: 20
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 35,
    minHeight: Dimensions.get('window').height*0.7,
  },
  section: {
    width: '90%',
    marginTop: 50
  },
  input: {
    width: '100%',
    backgroundColor: '#EDEFF3',
    borderRadius: 218,
    height: 56,
    paddingLeft: 25,
    opacity: 0.7,
    marginBottom: 25
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'stretch'
  }
})