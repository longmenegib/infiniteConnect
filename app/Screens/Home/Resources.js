import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

export default function Resources(){
  const navigation = useNavigation();

  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>Resources</Text>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.section}>
          <TouchableOpacity onPress={() => navigation.navigate("ResourceView")} style={styles.btn}>
            <Image onPress={() => navigation.navigate("ResourceView")} source={require('./../../Assets/icons/cap.png')} style={styles.icon} />
            <Text style={styles.text}>Education</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ResourceView")} style={styles.btn}>
            <Image source={require('./../../Assets/icons/house.png')} style={styles.icon} />
            <Text style={styles.text}>Housing Assistance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ResourceView")} style={styles.btn}>
            <Image source={require('./../../Assets/icons/money.png')} style={styles.icon} />
            <Text style={styles.text}>Financial Assistance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ResourceView")} style={styles.btn}>
            <Image source={require('./../../Assets/icons/case.png')} style={styles.icon} />
            <Text style={styles.text}>Medical Assistance</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ResourceView")} style={styles.btn}>
            <Image source={require('./../../Assets/icons/human.png')} style={styles.icon} />
            <Text style={styles.text}>Human Services</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ResourceView")} style={styles.btn}>
            <Image source={require('./../../Assets/icons/phoned.png')} style={styles.icon} />
            <Text style={styles.text}>Emergency Services</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
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
  section: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  btn: {
    width: '45%',
    height: 100,
    backgroundColor: '#28A7E3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '2.5%',
    marginBottom: 20
  },
  icon: {
    width: 45,
    height: 45
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 15,
    marginTop: 6
  }
})