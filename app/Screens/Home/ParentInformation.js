import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { baseURL } from '../../../utilis/urls';
import { authContext } from '../../Context.js/authContext';

export default function ParentInformation(){
  const navigation = useNavigation();
  const [parents, setParents] = useState({})
  const {user} = useContext(authContext);
  
  const getParent = async() => {
    try {
      const result = await (await axios.get(baseURL+'user-api/parent-infos/')).data;
      console.log("result", result)
    } catch (error) {
      console.log('Error during the post: ', error.response.data.error);
      console.log('Server status: ',error.response.status);
      console.log("error: ",error.response.data.error);
    }
  }

  useEffect(() => {
    getParent()
  }, [])
  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>Parent Information</Text>
        </View>
      </View> */}
      <ScrollView style={styles.body}>
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Father's Name</Text>
            <Text style={styles.val}>Martin Thiery Atangana</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of birth</Text>
            <Text style={styles.val}>01/02/1995</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.val}>Douala</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Profession</Text>
            <Text style={styles.val}>Web designer</Text>
          </View>
        </View>
        <View style={{ marginTop: 60 }}>
          <View style={styles.row}>
            <Text style={styles.label}>Mother's Name</Text>
            <Text style={styles.val}>Raisa Marie Biloa</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date of birth</Text>
            <Text style={styles.val}>01/02/1995</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.val}>Douala</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Profession</Text>
            <Text style={styles.val}>Teacher</Text>
          </View>
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
  label: {
    color: '#aaaaaa',
    marginBottom: 5
  },
  val: {
    width: '100%',
    borderBottomWidth: 0.7,
    borderBottomColor: '#aaaaaa',
    paddingBottom: 5,
    color: 'black',
    fontWeight: 'bold'
  },
  row: {
    marginBottom: 10
  }
})