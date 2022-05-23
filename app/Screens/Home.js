import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import StatusBar from './Statusbar';

export default function Home(){
  const navigation = useNavigation();

  return(
    <ImageBackground source={require('./../Assets/bg.png')} style={styles.main}>
      <StatusBar backgroundColor="#911" barStyle="light-content" />
      <View style={styles.header}>
        <TextInput placeholder='Search family...' style={styles.input} />
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('MyFamily')} style={styles.rect}>
            <View style={styles.circle}>
              <Image source={require('./../Assets/icons/family.png')} style={styles.icon} />
            </View>
            <Text style={styles.txt}>My Families</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReportIssue')} style={styles.rect}>
            <View style={styles.circle}>
              <Image source={require('./../Assets/icons/board.png')} style={styles.icon} />
            </View>
            <Text style={styles.txt}>Report Issue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate("LifeStory")} style={styles.rect}>
            <View style={styles.circle}>
              <Image source={require('./../Assets/icons/story.png')} style={styles.icon} />
            </View>
            <Text style={styles.txt}>Personal informations</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Resources')} style={styles.rect}>
            <View style={styles.circle}>
              <Image source={require('./../Assets/icons/thinking.png')} style={styles.icon} />
            </View>
            <Text style={styles.txt}>Resources</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(0,0,360, 0.1)',
    borderRadius: 218,
    height: 45,
    paddingLeft: 25,
    opacity: 0.7
  },
  header: {
    padding: 10,
    paddingTop: 20
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    paddingVertical: 40,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  circle: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 75,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
    zIndex: 5,
    borderWidth: 1,
    borderColor: '#28A7E3'
  },
  rect: {
    width: 130,
    height: 130,
    backgroundColor: '#28A7E3',
    borderRadius: 10,
    marginHorizontal: 15
  },
  icon: {
    width: 60,
    height: 60
  },
  txt: {
    marginTop: 20,
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold'
  },
})