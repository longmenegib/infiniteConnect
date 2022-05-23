import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

export default function LifeStory(){
  const navigation = useNavigation();

  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: '#000000' }}>Personal infos</Text>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <TouchableOpacity onPress={() => navigation.navigate("ParentInformation")} style={styles.btn}>
          <View style={styles.leftIconView}>
            <Image style={{height:50, width:50, resizeMode:'contain'}} source={require('./../../Assets/icons/couple.png')} />
          </View>
          <View style={{ flex: 1, marginLeft: 7 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#424242' }}>Parent Information</Text>
          </View>
          <View style={{ paddingRight: 15 }}>
            <Image source={require('./../../Assets/icons/bnext.png')} style={styles.next} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <View style={styles.leftIconView}>
            <Image style={{height:50, width:50, resizeMode:'contain'}} source={require('./../../Assets/icons/bag.png')} />
          </View><View style={{ flex: 1, marginLeft: 7 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#424242' }}>School Information</Text>
          </View>
          <View style={{ paddingRight: 15 }}>
            <Image source={require('./../../Assets/icons/gnext.png')} style={styles.next} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <View style={styles.leftIconView}>
            <Image style={{height:50, width:50, resizeMode:'contain'}} source={require('./../../Assets/icons/medicalnote.png')} />
          </View>
          <View style={{ flex: 1, marginLeft: 7 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#424242' }}>Medical Information</Text>
          </View>
          <View style={{ paddingRight: 15 }}>
            <Image source={require('./../../Assets/icons/bnext.png')} style={styles.next} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
        <View style={styles.leftIconView}>
            <Image style={{height:50, width:50, resizeMode:'contain'}} source={require('./../../Assets/icons/folders.png')} />
          </View>
          <View style={{ flex: 1, marginLeft: 7 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#424242' }}>Placement History</Text>
          </View>
          <View style={{ paddingRight: 15 }}>
            <Image source={require('./../../Assets/icons/gnext.png')} style={styles.next} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main:{
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 40,
    width: '100%',
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  back: {
    width: 20,
    height: 20
  },
  body: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 30,
  },
  btn: {
    width: '98%',
    height: 70,
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginBottom: 40,
    borderRadius: 10
  },
  leftIconView: {
    width: 85,
    height: '100%',
    alignItems:'center',
    justifyContent:'center',  
  },
  next: {
    width: 30,
    height: 30
  },
})