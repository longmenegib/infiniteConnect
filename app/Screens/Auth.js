import React, {useEffect, useContext} from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Splash from './Splash';
import {AccessContext} from '../context/AccessContext';
// import Url from '../resources/Url';

// import { AuthContext } from '../App';

export default function Auth({navigation}){
    const {setIskIdAccount} = useContext(AuthContext);
    const {isLoggedIn, setisLoggedIn} = useContext(AccessContext);

  useEffect(()=>{
    bootstrapAsync();
  }, [])

//   const {signIn} = useContext(AuthContext);

  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // console.log(userToken);

    setTimeout(() => {
      if(userToken){
        setisLoggedIn(true)
        if(JSON.parse(userToken).account_type==='kid'){
          setIskIdAccount(true);
          navigation.navigate('MainTab')
        }else{
          console.log('not kid');
          setIskIdAccount(false);
          navigation.navigate('GuessChat')
        }
      }else{
        setisLoggedIn(false)
        navigation.navigate('FirstStepper');
      }
    }, 3*1000)
  };


    return (
      <View style={styles.container}>
        {/* <Url/> */}
        <Splash />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});