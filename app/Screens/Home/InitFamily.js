import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

export default function InitFamily(){
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [emails, setEmails] = useState('');

  const sendInvitation = () => {
    setShow(false);
  }

  const putModal = () => {
    return(
      <Modal animationType={"slide"} transparent={true} visible={show} onRequestClose={() => setShow(false) }>
        <View style = {styles.modalwrap}>
          <View style = {styles.modal}>
            <Text style={{ color: '#424242' }}>Add Email</Text>
            <TextInput
              value={emails}
              onChangeText={e => setEmails(e)}
              placeholder={'Email Address'}
              keyboardType='email-address'
              multiline
              style={{ height: 100, color: 'green', textAlignVertical: 'top', padding: 6, alignItems: 'flex-start', width: '100%', borderColor: '#15B715', borderWidth: 1, marginBottom: 15, borderRadius: 6, marginTop: 5 }}
            />
            <TouchableOpacity onPress={() => sendInvitation()} style={styles.btn}>
              <Text style={{ color: 'white' }}>Send Invitation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  return(
    <View style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: '#000000' }}>Name of family</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.top}>
          <Image source={require('./../../Assets/family.jpg')} style={styles.img} />
          <View style={styles.info}>
            <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Name of fmaily</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <Image source={require('./../../Assets/icons/location.png')} style={styles.icon} />
              <Text numberOfLines={1} style={{ marginLeft: 5, color: '#424242' }}>Buea, Cameroon</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={{ color: '#aaa' }}>No family member yet</Text>
          <Text style={{ color: '#424242' }}>Invite new members to your family</Text>
        </View>
        <TouchableOpacity onPress={() => setShow(true)} style={styles.sendbtn}>
          <Text style={{ color: 'white', fontSize: 17 }}>Invite a member</Text>
        </TouchableOpacity>
      </View>
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
  back: {
    width: 20,
    height: 20
  },
  body: {
    flex: 1,
  },
  top: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  img: {
    width: '100%',
    height: 130,
    borderRadius: 20
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
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendbtn: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 70,
    height: 56,
    backgroundColor: '#15B715',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 218,
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
    borderRadius: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    width: '80%',
    paddingTop: 15,
    paddingHorizontal: 15,
    minHeight: 200,
    elevation: 20
  },
  btn: {
    width: '100%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: '#15B715',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 218,
  }
});