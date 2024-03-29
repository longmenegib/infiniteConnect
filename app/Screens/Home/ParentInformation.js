import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ParentInformation({navigation}){
  // const navigation = useNavigation();
  const [parents, setParents] = useState({})
  const [loading, setLoading] = useState(false)
  
  const getParent = async() => {
    setLoading(true)
    const user = await AsyncStorage.getItem('userToken')
    const token = JSON.parse(user).result.token;
    await axios.get('/user-api/parent-infos/', { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(res => {
        console.log(res.data.results);
        setParents(res.data.results[0])
      }).catch(err=>{
        console.log("error ", err.request)
      })
      setLoading(false);
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
            <Text style={styles.val}>{!loading && (parents?.father_name||'Unknown')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.val}>{!loading&&(parents?.father_phone||'Unknown')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.val}>{!loading&&(parents?.father_address||'Unknown')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Profession</Text>
            <Text style={styles.val}>{!loading&&(parents?.father_profession||'Unknown')}</Text>
          </View>
        </View>
        <View style={{ marginTop: 60 }}>
          <View style={styles.row}>
            <Text style={styles.label}>Mother's Name</Text>
            <Text style={styles.val}>{!loading&&(parents?.mother_name||'Unknown')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.val}>{!loading&&(parents?.mother_phone||'Unknown')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.val}>{!loading&&(parents?.mother_address||'Unknown')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Profession</Text>
            <Text style={styles.val}>{!loading&&(parents?.mother_profession||'Unknown')}</Text>
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