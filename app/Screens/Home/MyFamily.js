import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { baseURL } from '../../../utilis/urls';
import axios from 'axios';

export default function MyFamily(){
  const navigation = useNavigation();
  const prevfamilies = [ 1, 2, 3, 4, 5];
  const [families, setFamilies] = useState([]);
  
  const getFamilies = async() => {
    try {
      const result = await (await axios.get(baseURL+'family-api/families/')).data
      // console.log('Result: ', result);
      setFamilies(result.results)
    } catch (error) {
      console.log('Server status: ',error.response.status);
      console.log("error: ",error.response.data.error);
    }
  }

  useEffect(() => {
    getFamilies()
  }, [])
  return(
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        {/* <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity style={styles.btn}>
            <Text style={{ color: 'white' }}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sbtn}>
            <Text style={styles.stxt}>Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sbtn}>
            <Text style={styles.stxt}>Near You</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <ScrollView style={styles.body}>
        {families.map((family, i) => {
          return(
            <TouchableOpacity onPress={() => navigation.navigate('ViewFamily', {familyObj: JSON.stringify(family)})} style={styles.family}>
              <Image source={require('./../../Assets/family.jpg')} style={styles.img} />
              {/* <TouchableOpacity style={styles.likebtn}>
                <Image style={styles.heart} source={i%2? require('./../../Assets/icons/heart.png'): require('./../../Assets/icons/heartd.png')} />
              </TouchableOpacity> */}
              <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'sans-serif', color: 'black' }}>{family.family_name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('./../../Assets/icons/location.png')} style={styles.back} />
                  <Text style={{ marginLeft: 5, color: '#424242' }}>{family.address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('CreateFamily')} style={styles.fab}>
        <Image source={require('./../../Assets/icons/plus.png')} style={{ width: 35, height: 35 }} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: 5,
    borderRadius: 4,
    backgroundColor: '#28A7E3'
  },
  sbtn: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginHorizontal: 5,
    borderRadius: 4,
    backgroundColor: '#e9f6fc'
  },
  stxt: {
    color: '#28A7E3'
  },
  body: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    paddingTop: 30
  },
  family: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 30
  },
  img: {
    width: '100%',
    height: 170,
    borderRadius: 20,
    zIndex: 1,
    resizeMode: 'cover'
  },
  likebtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 2,
    top: 15,
    right: 15
  },
  heart: {
    width: 30,
    height: 30
  },
  fab: {
    width: 55,
    height: 55,
    borderRadius: 30,
    position: 'absolute',
    bottom: 70,
    left: 30,
    backgroundColor: 'white',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
});