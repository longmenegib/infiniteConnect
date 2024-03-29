import React from 'react';
import { View, Dimensions, Image } from 'react-native';

export default function Splash(){
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#232B3B', width: '100%' }}>
      <Image style={{ width: 200, height: 100, resizeMode: 'contain' }} source={require('./../Assets/Logo/logoname.png')} />
    </View>
  )
}