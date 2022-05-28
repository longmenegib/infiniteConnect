import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "react-navigation-hooks";
// import axios from 'axios';

import Splash from './Splash';
import axios from 'axios';
import { baseURL } from '../../utilis/urls';

//import Url from '../resources/Url';

export default function Auth() {
  const navigation = useNavigation();

  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    console.log("Previous user token: ", userToken);
    console.log("Previous user Id: ", userId);
    try {
      const apiPoint= `${baseURL}user-api/users/${userId}/`;
      console.log("Api point: ",apiPoint)
      if(userToken) {
        axios.defaults.headers.common['Authorization'] = `Token ${userToken}`;
      }
      const userData = await (await axios.get(apiPoint)).data;
      console.log('User informations: ', userData);
    } catch (error) {
      console.log(error.response.data);
    }
    setTimeout(() => navigation.navigate(userToken ? 'App' : 'Auth'), 1.5*1000)
  };

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