import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { story } from '../../../utilis/story';
import ParentInformation from './ParentInformation'

export default function LifeStory(){
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false)
  const [rend, setRend] = useState(1);
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
      <Modal animationType={"slide"} transparent={true} visible={showModal} >
        <View style = {styles.modalwrap}>
          <View style = {styles.modal}>
            <Image source={require('./../../Assets/icons/danger.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 25, color: 'black' }}>Information is locked</Text>
            <Text style={{ textAlign: 'center', marginVertical: 10, width: '90%', color: '#424242' }}>The information is locked and will be available when you turn <Text style={{ fontWeight: 'bold' }} >15 years</Text> old.</Text>
            <TouchableOpacity onPress={() => [setRend(1), setShowModal(false)]} style={styles.sendbtn}>
              <Text style={{ color: 'white' }}>Go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: '#000000' }}>My life story</Text>
        </View>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setRend(1)} style={putbtnStyle(1)}>
          <Text style={putxtStyle(1)}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => [setRend(2), setShowModal(true)]} style={putbtnStyle(2)}>
          <Text style={putxtStyle(2)}>Parents informations</Text>
        </TouchableOpacity>
      </View>    
      <ScrollView>
        {rend==1? (
        <View style={{padding:15}}>
          <Text style={{fontSize:17}}>{story}</Text>
        </View>
        )
        :
        (
        <ParentInformation/>
        )  
      }
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