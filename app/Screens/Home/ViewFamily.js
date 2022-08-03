import axios from '../../utils/axios';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Modal, TextInput, Alert } from 'react-native';
// import { useNavigation, useNavigationState } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'native-base'


export default function ViewFamily({navigation, route}){
  // const navigation = useNavigation();
  // const params = useNavigationState().params;
  const [show, setShow] = useState(false);
  const [inviteePhone, setInviteePhone] = useState('');
  const [apiError, setApiError] = useState('');
  const {family} = route.params;
  // console.log(family.members)
  const [families, setFamilies] = useState([]);

  const getFamilies = async() => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);
    let token = JSON.parse(userToken).result.token;
    await axios.get('/user-api/kids/family-members', { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        console.log(res.data);
        setFamilies(res.data.family_members);
        // setLoad(false)
      }).catch(err=>{
        console.log(err.request);
      })
  }

  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  useEffect(() => {
    getFamilies()
  }, [])  

  const sendInvitation = async() => {
    setApiError('');
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    let token = JSON.parse(userToken).result.token;
    let id = JSON.parse(userToken).result.kid.id;
    console.log(id);
    // return
    if (inviteePhone){
      await axios.post(`/user-api/kids/${id}/invite-family`,  {phone:inviteePhone}, { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        console.log('good',res.data);
        setShow(false);
        Alert.alert("Success","Family member invited");
      }).catch(err=>{
        console.log(err.request);
        setApiError('error while processing');
      })
      
    }
  }

  

  const putModal = () => {
    return(
      <Modal animationType={"slide"} transparent={true} visible={show} onRequestClose={() => setShow(false) }>
        <View style = {styles.modalwrap}>
          <View style = {styles.modal}>
            <TouchableOpacity style={{right: 10, position: 'absolute', top: 5}} onPress={()=> setShow(false)}>
              <Icon type='AntDesign' name='close' style={{color: '#28A7E3', fontSize: 26 }} />
            </TouchableOpacity>
            <Text style={{ color: 'black' }}>Add phone number</Text>
            <TextInput
              value={inviteePhone}
              onChangeText={e => setInviteePhone(e)}
              placeholder={'Phone number'}
              keyboardType='phone-pad'
              placeholderTextColor='gray'
              style={{ width: '100%', borderColor: '#aaa', color: 'gray', borderWidth: 1, marginBottom: 15, borderRadius: 6, marginTop: 5 }}
            />
            <TouchableOpacity onPress={() => sendInvitation()} style={styles.sendbtn}>
              <Text style={{ color: 'white' }}>Send Invitation</Text>
            </TouchableOpacity>
            {apiError ? <Text style={{marginTop:5, alignSelf:'center', color:'red'}}>{apiError}</Text>: null}
          </View>
        </View>
      </Modal>
    )
  }

  return(
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>{family.family_name}</Text>
        </View>
      </View>
      <ScrollView style={[styles.main, { paddingTop: 20 }]}>
        <StatusBar hidden={true} />
        <View style={styles.top}>
          <Image source={family.image? {uri:family.image} : require('./../../Assets/family.jpg')} style={styles.img} />
          <View style={styles.info}>
            <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{family.family_name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <Image source={require('./../../Assets/icons/location.png')} style={styles.icon} />
              <Text numberOfLines={1} style={{ marginLeft: 5, color: '#424242' }}>{family.address}</Text>
            </View>
          </View>
        </View>
        <View style={styles.members}>
          {families.map((i, index) => {
            return(
              <View key={index} style={styles.member}>
                <View style={{ width: '80%', alignItems: 'center', alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                  {/* <Image source={require('./../../Assets/person.jpg')} style={styles.person} /> */}
                  <Text numberOfLines={1} style={{ marginLeft: 6, fontSize: 17, color: 'black' }}>{i.username}</Text>
                </View>
                <View style={{ width: '80%', alignItems: 'center', justifyContent: 'flex-end', alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => navigation.push("MainTab", {screen: 'Chat'})}
                    style={{ width: 35, height: 35, borderRadius: 20, backgroundColor: '#15B715', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('./../../Assets/icons/chat.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
        </View>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.fab}>
        <View style={styles.btn}>
          <Image source={require('./../../Assets/icons/wuser.png')} style={{ width: 35, height: 35 }} />
        </View>
        <Text style={styles.fabtxt}>Add member</Text>
      </TouchableOpacity>
      <View style={{ marginBottom: 100 }} />
      </ScrollView>
      {putModal()}
    </View>
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
  top: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  img: {
    width: '100%',
    // minHeight:150,
    height: 180,
    borderRadius: 20,
    resizeMode:'cover'
  },
  info: {
    width: '60%',
    backgroundColor: 'white',
    height: 70,
    marginTop: -55,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20
  },
  members: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 15
  },
  member: {
    width: '44%',
    height: 110,
    marginHorizontal: '3%',
    marginVertical: 10,
    backgroundColor: '#eff8fd',
    borderRadius: 10,
    elevation: 5
  },
  person: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  fab: {
    marginLeft: '3%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10
  },
  btn: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#28A7E3',
    alignItems: 'center',
    elevation: 10,
    justifyContent: 'center'
  },
  fabtxt: {
    marginLeft: 6,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242'
  },
  modalwrap: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(360,360,360,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 7,
    paddingBottom: 15,
    justifyContent: 'center',
    width: '80%',
    paddingTop: 10,
    paddingHorizontal: 10,
    minHeight: 200,
    elevation: 20
  },
  sendbtn: {
    width: '100%',
    height: 46,
    backgroundColor: '#15B715',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 218,
  }
})