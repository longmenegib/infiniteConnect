import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TurboModuleRegistry } from 'react-native';
import {Spinner} from 'native-base';

const images = [require('./../../Assets/icons/phoned.png'), require('./../../Assets/icons/case.png'), require('./../../Assets/icons/money.png'),
require('./../../Assets/icons/human.png'), require('./../../Assets/icons/house.png'), require('./../../Assets/icons/cap.png')]

export default function Resources({navigation}){
  // const navigation = useNavigation();

  const [families, setFamilies] = useState([]);
  const [loading, setIsloading]= useState(true)
  
  const getFamilies = async() => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    let token = JSON.parse(userToken).result.token;
    setIsloading(TurboModuleRegistry)
    await axios.get('/ressource-api/ressource-types', { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        console.log(res.data.results);
        setFamilies(res.data.results)
        setIsloading(false);
      }).catch(err=>{
        setIsloading(false)
        console.log(err.request);
      })
  }

  useEffect(() => {
    getFamilies()
  }, [])

  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 10, left: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>Resources</Text>
        </View>
      </View>

      {loading ?
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Spinner color="blue"/>
            </View>
            :
            <>
            {families.length<1 ?
                <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Image source={require('../../Assets/icons/error.png')} style={{ width: 70, height: 70 }} />
                <Text style={{ marginTop: 15, fontWeight: 'bold', color: 'gray', fontSize: 18 }}>Resources not available</Text>
                
              </View>
                :
      <ScrollView style={styles.body}>
        <View style={styles.section}>
          {families.map((res, i)=>{
            return(
              <TouchableOpacity key={i} onPress={() => navigation.navigate("ResourceView", {category: res, image: images[i]})} style={styles.btn}>
              <Image onPress={() => navigation.navigate("ResourceView")} source={images[i]} style={styles.icon} />
              <Text style={styles.text}>{res.label}</Text>
            </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
      }
    </>
    }
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