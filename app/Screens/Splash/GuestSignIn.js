import React, { useContext, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, StatusBar, Dimensions, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../utils/axios';
import { baseURL } from '../../../utilis/urls';
import { AccessContext } from '../../context/AccessContext';
import { Spinner } from 'native-base';

export default function GuestSignIn({navigation}){
  // const navigation = useNavigation();
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState(null);
  const [apiError, setApiError] = useState(null);
  const {setisLoggedIn} = useContext(AccessContext);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSignIn = async() => {
    setIsSpinning(true);
    setApiError(null)
    if (otp && phone && name) {
      console.log('Starting verification...');
      console.log('Otp: ', otp, 'Phone: ', phone, 'Name: ', name);
      await axios.post('/user-api/verify/family-member', {otp:otp, phone:phone, name:name}, { withCredentials: false, timeout: 10000 })
      .then(async res => {
        console.log(res.data);
        // let userit = [];
        // // userit = [...res.data,{account_type:'kid'}];
        // userit= res.data;

        // userit.account_type = 'family';
        // console.log(userit);
        await AsyncStorage.setItem('userToken', JSON.stringify(res.data));
        setisLoggedIn(true);
        // navigation.navigate("GuessChat");
      }).catch(err=>{
        console.log(err.request);
        if(err.response.status === 400){
          setApiError(err.response.data.error)
        }else if(err.response.status === 0){
          Alert.alert(
            'Error',
            'Please check internet connection'
          )
        }
      })
      setIsSpinning(false);
    } else {
      setIsSpinning(false);
      setApiError('phone and id numbers must not be empty')
    }
  }


  return(
    <ScrollView style={styles.main}>
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
            onChangeText={text => setName(text)}
            placeholder='Enter your username'
            keyboardType='default'
            style={styles.input}
          />
          <TextInput
            value={otp}
            onChangeText={text => setOtp(text)}
            placeholder='Enter your invitee Id'
            keyboardType='phone-pad'
            style={styles.input}
          />
          <TextInput
            value={phone}
            onChangeText={e => setPhone(e)}
            placeholder='Enter your phone number'
            keyboardType='phone-pad'
            style={styles.input}
          />
          {/* <TextInput
            value={name}
            onChangeText={text => setName(text)}
            placeholder='Enter your name'
            style={styles.input}
          /> */}
          {apiError? <Text style={{color:'red', alignSelf:'center'}} >{apiError}</Text> : null }
          {/* <TextInput
            value={phone}
            onChangeText={e => setPhone(e)}
            placeholder='Enter your phone number'
            keyboardType='phone-pad'
            style={styles.input} 
          /> */}
          {isSpinning ? 
            <View style={[styles.input, { marginTop: 40, alignItems: 'center', justifyContent: 'center', paddingLeft: 0, backgroundColor: '#e7f8e6'}]}>
                <Spinner color='#15b715'/>
            </View> : 
          <TouchableOpacity onPress={() => handleSignIn()} style={[styles.input, { marginTop: 30, alignItems: 'center', justifyContent: 'center', paddingLeft: 0, backgroundColor: '#e7f8e6'}]}>
            <Text style={{ color: '#15B715', fontSize: 17 }}>Sign In & Continue</Text>
          </TouchableOpacity>
          }
        </View>
      </View>
      <Text style={{ padding: 10, textAlign: 'center', color: '#424242' }}>By signing in, you are agreeing to our <Text style={{ fontWeight: 'bold' }}>Terms of Use</Text> and our <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text></Text>
    </ScrollView>
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
    // marginTop:5,
    marginBottom: 25
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'stretch'
  }
})