import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, TextInput, Dimensions } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserSignIn(){
  const navigation = useNavigation();
  const [remember, setRemember] = useState(false);
  const [id, setId] = useState(null);

  const handleSignIn = async() => {
    // await AsyncStorage.setItem('userToken', 'Infinity');
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
            value={id}
            onChangeText={e => setId(e)}
            placeholder='Enter your user ID'
            style={styles.input} 
          />
          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setRemember(!remember)} style={{ flexDirection: 'row' }}>
              {remember ? (<View style={styles.checked} />) : (<View style={styles.check} />)}
              <Text style={{ color: '#424242' }}>Remember Me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: '#424242' }}>Forgot your ID? <Text style={{ color: '#15B715' }}>Request new</Text></Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleSignIn()} style={[styles.input, { marginTop: 50, alignItems: 'center', justifyContent: 'center', paddingLeft: 0, backgroundColor: '#e7f8e6'}]}>
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
    opacity: 0.7
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#dbdbdb',
    borderWidth: 2,
    marginRight: 5
  },
  checked: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#dbdbdb',
    borderWidth: 2,
    marginRight: 5,
    backgroundColor: '#15B715',
    opacity: 0.6
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'stretch'
  }
})