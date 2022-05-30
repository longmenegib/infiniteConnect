import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "react-navigation-hooks";
// import axios from 'axios';

import Splash from './Splash';
import axios from 'axios';
import { baseURL } from '../../utilis/urls';
import { authContext } from '../Context.js/authContext';

//import Url from '../resources/Url';

export default function Auth() {
  const navigation = useNavigation();
  const {setUser} = useContext(authContext);
  const [token, setToken] = useState(null)

  
  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    if(userToken && !token) {setToken(userToken)};
    // console.log("Previous user token: ", userToken);
    // console.log("Previous user Id: ", userId);
    try {
      const apiPoint= `${baseURL}user-api/kids/${userId}/`;
      console.log("Api point: ",apiPoint)
      const userData = await (await axios.get(apiPoint)).data;
      // console.log('User informations: ', userData);
      setUser(userData);
    } catch (error) {
      console.log(error.response.data);
    }
    setTimeout(() => navigation.navigate(userToken ? 'App' : 'Auth'), 1.5*1000)
  };
  
  
  useEffect(() => {
    if(token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
      _bootstrapAsync()
    }
    console.log('User token: ', token);
  }, [token])

  
  useEffect(() => {
    _bootstrapAsync();
  }, []);
  // Render any loading content that you like here
    return (
      <View style={styles.container}>
        {/* <Url /> */}
        <Splash />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232B3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});