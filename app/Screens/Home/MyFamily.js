import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Linking } from 'react-native';
// import {ListView/}
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Spinner, Content, Button, Icon, List, ListItem, SwipeRow } from 'native-base';

const datas = [
  'Simon Mignolet',
  'Nathaniel Clyne',
  'Dejan Lovren',
  'Mama Sakho',
  'Alberto Moreno',
  'Emre Can',
  'Joe Allen',
  'Phil Coutinho',
];

export default function MyFamily({navigation}){
  // const navigation = useNavigation();
  const prevfamilies = [ 1, 2, 3, 4, 5];
  const [families, setFamilies] = useState([]);
  const [load, setLoad] = useState(true);
  const [selected, setSelected] = useState(null);
  
  const getFamilies = async() => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);
    let token = JSON.parse(userToken).result.token;
    await axios.get('/family-api/families/', { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        console.log(res.data);
        setFamilies(res.data.results);
        setLoad(false)
      }).catch(err=>{
        console.log(err.request);
        setLoad(false)
      })
  }

  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  useEffect(() => {
    getFamilies()
  }, [])

  const deleteRow=(a, b, c)=>{

  }
  return(
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 10, left: 5 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 18 }}>My family</Text>
      </View>
      {load ?
            <View style={{...styles.main, alignItems: 'center', justifyContent: 'center'}}>
                <Spinner color="blue"/>
            </View>
            :
            <>
            {families.length<1 ?
                <View style={{...styles.main, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../Assets/icons/error.png')} style={{ width: 70, height: 70 }} />
                <Text style={{ marginTop: 15, fontWeight: 'bold', color: 'gray', fontSize: 18 }}>No family</Text>
                
              </View>
                :
            <Content scrollEnabled={true} style={styles.body}>
              {families.map((res, i)=>{
                return(
                  <SwipeRow
                  key={i}
                  leftOpenValue={75}
                  left={
                    selected===i ?
                    <>
                      <Spinner color="red" style={{color: '#fff'}}/>
                    </>
                    :
                    <Button 
                    style={{maxHeight: 80, padding: 0, borderBottomWidth:0, margin: 0, marginTop: 10}} danger 
                    onPress={() => [setSelected(i)]}>
                      <Icon active name="trash" />
                    </Button>
                  }
                  style={{height: 100, padding: 0, borderBottomWidth: 0, alignSelf: 'center'}}
                  disableLeftSwipe={true}
                  body={
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewFamily', {family: res})}>
                    <View style={styles.familyCard}>
                      <Image source={require('./../../Assets/family.jpg')} style={styles.img} />
                      <View style={{ flex:1,marginTop: 10, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'sans-serif', color: 'black' }}>{res.family_name}</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center', margin:5 }}>
                            <Image source={require('./../../Assets/icons/location.png')} style={styles.back} />
                            <Text style={{ marginLeft: 5, color: '#424242' }}>{res.address}</Text>
                        </View>
                      </View>
                      <View 
                      style={{height:38, width:38, alignItems:'center', justifyContent:'center', backgroundColor:"#28A7E3", borderRadius:30}}>
                        <Image source={require('../../Assets/icons/chatbubble.png')} style={styles.chatBubble} />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  }
                />
                )
              })}
              </Content>
              }
              </>
          }
      
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
    flexDirection: 'row',
    justifyContent: 'center',
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
    // paddingTop: 30,
    paddingBottom:60
  },
  familyCard:{
    backgroundColor:"rgba(40, 167, 227, 0.1)",
    padding:8,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:16,
    maxHeight: 100
    // elevation:1
  },
  family: {
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    // marginBottom: 20
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 24,
    zIndex: 1,
    resizeMode: 'cover'
  },
  chatBubble:{
    height:27,
    width:27,
    resizeMode:'contain',
    tintColor:'#fff',
    marginLeft:-2
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