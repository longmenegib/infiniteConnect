import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, TextInput, Dimensions, Alert, ScrollView } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../utils/axios';
import { baseURL } from '../../../utilis/urls';
import { AccessContext } from '../../context/AccessContext';
// import { AuthContext } from '../../context/AuthContext';
import { Spinner } from 'native-base';

export default function UserSignIn({navigation}){
  // const navigation = useNavigation();
  const [remember, setRemember] = useState(true);
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [apiError, setApiError] = useState(null);
  const {setisLoggedIn} = useContext(AccessContext);
  const [isSpinning, setIsSpinning] = useState(false);


  const handleSignIn = async() => {
    setApiError(null);
    setIsSpinning(true);
    // navigation.navigate('MainTab', {screen: 'Home'})
    if (otp && phone) {
      console.log('Starting verification...');
      console.log('Otp: ', otp, 'Phone: ', phone)
      let dataLog = {
        otp: otp,
        phone: phone
      }
      await axios.post('/user-api/verify/kid', dataLog, { withCredentials: false, timeout: 10000 })
      .then(async res => {
        console.log(res.data);
        // let userit = [];
        // // userit = [...res.data,{account_type:'kid'}];
        // userit= res.data;

        // userit.account_type = 'kid';
        // console.log(userit);
        await AsyncStorage.setItem('userToken', JSON.stringify(res.data));
        setisLoggedIn(true);
        navigation.navigate('MainTab'); 
      }).catch(err=>{
        // console.log(err.request);
        if(err.response.status === 400){
          setApiError(err.response.data.error)
          console.log(err.response.data)
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
            value={otp}
            onChangeText={e => setOtp(e.toString())}
            placeholder='Enter your user ID'
            style={[styles.input, {marginBottom:30, color: 'gray'}]} 
            placeholderTextColor='gray'
          />
          <TextInput 
            value={phone}
            onChangeText={(e) => setPhone(e)}
            placeholder='Enter your phone number'
            style={{...styles.input, color: 'gray'}} 
            keyboardType="phone-pad"
            placeholderTextColor='gray'
          />
          {apiError? <Text style={{color:'red', alignSelf:'center'}} >{apiError}</Text> : null }
          <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setRemember(!remember)} style={{ flexDirection: 'row' }}>
              {remember ? (<View style={styles.checked} />) : (<View style={styles.check} />)}
              <Text style={{ color: '#424242' }}>Remember Me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: '#424242' }}>Forgot your ID? <Text style={{ color: '#15B715' }}>Request new</Text></Text>
            </TouchableOpacity>
          </View>
          {isSpinning ? 
            <View style={[styles.input, { marginTop: 40, alignItems: 'center', justifyContent: 'center', paddingLeft: 0, backgroundColor: '#e7f8e6'}]}>
                <Spinner color='#15b715'/>
            </View> : 
          <TouchableOpacity onPress={() => handleSignIn()} style={[styles.input, { marginTop: 40, alignItems: 'center', justifyContent: 'center', paddingLeft: 0, backgroundColor: '#e7f8e6'}]}>
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