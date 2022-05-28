import React, { useContext, useState } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { authContext } from '../Context.js/authContext';

export default function PersonalInformation(){
  const navigation = useNavigation();
  const [rend, setRend] = useState(1);
  const [show, setShow] = useState(false);
  const {user} = useContext(authContext);

  const putbtnStyle = (e) => {
    if(e == rend){
      return { width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#28A7E3', borderRadius: 4 }
    }else{
      return { width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }
    }
  }

  const putxtStyle = (e) => {
    if(e == rend){
      return { color: 'white', fontWeight: 'bold' }
    }
  }

  const putModal = () => {
    return(
      <Modal animationType={"slide"} transparent={true} visible={show} >
        <View style = {styles.modalwrap}>
          <View style = {styles.modal}>
            <Image source={require('./../Assets/icons/danger.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 25, color: 'black' }}>Information is locked</Text>
            <Text style={{ textAlign: 'center', marginVertical: 10, width: '90%', color: '#424242' }}>The information is locked and will be available when you turn <Text style={{ fontWeight: 'bold' }} >15 years</Text> old.</Text>
            <TouchableOpacity onPress={() => [setRend(1), setShow(false)]} style={styles.sendbtn}>
              <Text style={{ color: 'white' }}>Go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  const dateOptions = {weekday: 'long', year:'numeric', month:'long', day:'numeric'};
  const birthdate = new Date(user?.birthdate);
  return(
    <ImageBackground source={require('./../Assets/bg.png')} style={styles.main}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setRend(1)} style={putbtnStyle(1)}>
            <Text style={putxtStyle(1)}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => [setRend(2), setShow(true)]} style={putbtnStyle(2)}>
            <Text style={putxtStyle(2)}>Personal informations</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.pic}>
            <Image source={require('./../Assets/icons/camera.png')} style={styles.img} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>{user?.first_name +'  '+ user?.last_name}</Text>
            {/* <Text style={{ fontSize: 16, color: '#424242' }}>Buea, Santa</Text>
            <Text style={{ color: '#999999' }}>This is the biography of this weird dude that I don't even know or like.</Text> */}
          </View>
        </View>
        <View style={{ paddingVertical: 20, width: '100%', borderBottomColor: '#aaa', borderBottomWidth: 0.5 }}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.val}>{user?.sex}</Text>
        </View>
        <View style={{ paddingVertical: 20, width: '100%', borderBottomColor: '#aaa', borderBottomWidth: 0.5 }}>
          <Text style={styles.label}>Date of birth</Text>
          <Text style={styles.val}>{birthdate.toLocaleDateString("en-US", dateOptions)}</Text>
          <View style={{ marginTop: 15 }} />
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.val}>{user?.email ? user.email:"No email"}</Text>
        </View>
      </View>
      {putModal()}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 4
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  pic: {
    width: 100,
    height: 100,
    backgroundColor:'gray',
    marginRight:20,
    borderRadius:50
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 65
  },
  label: {
    fontWeight: 'bold',
    color: '#999999',
    marginBottom: 5
  },
  val: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
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
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 10,
    minHeight: 200,
    elevation: 20
  },
  sendbtn: {
    width: '80%',
    height: 35,
    backgroundColor: '#15B715',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 218,
    marginTop: 10
  }
});