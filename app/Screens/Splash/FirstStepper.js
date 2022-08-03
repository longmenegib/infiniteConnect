import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
// import { useNavigation, useIsFocused } from 'react-navigation-hooks';

export default function FirstStepper({navigation}){
  // const isFocused = useIsFocused();

  useEffect(() => {
    // if(isFocused){
      setTimeout(() => navigation.navigate("SecondStepper"), 1500);
    // }
  }, []);

  return(
    <View style={styles.main}>
      <StatusBar hidden={false} backgroundColor="#232B3B" />
      <Image style={styles.logo} source={require('./../../Assets/Logo/icone.png')} />
      <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Welcome</Text>
      <Image source={require('./../../Assets/intro.png')} style={styles.img} />
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 100 }}>
        <View style={styles.adot} />
        <TouchableOpacity style={styles.dot} onPress={()=>navigation.navigate('SecondStepper')}/>
        <View style={styles.dot} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#232B3B',
    justifyContent: 'center'
  },
  img: {
    width: 300,
    height: 300
  },
  dot:{ 
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#aaa',
    marginHorizontal: 4
  },
  adot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#efefef',
    marginHorizontal: 4
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'stretch'
  }
})