import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Platform } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import ImagePicker from 'react-native-image-crop-picker';


export default function GuestMore(){
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const handleCreate = () => {
        navigation.navigate('Home');
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          compressImageQuality: 0.8,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
          this.bs.current.snapTo(1);
        });
      };

  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>Create a family</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 35 }}>
          <TouchableOpacity onPress={choosePhotoFromLibrary} style={styles.pic}>
            <Image source={image? {uri:image}: require('./../../Assets/icons/camera.png')} style={{ width: image?'100%':50, height:image? '100%':50 }} />
          </TouchableOpacity>
          <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#28A7E3', marginTop: 60, marginLeft: -25 }}>
            <Image source={require('./../../Assets/icons/wedit.png')} style={styles.back} />
          </View>
        </View>
        <View style={styles.drow}>
          <TextInput
            placeholder='Enter your name'
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        {/* <View style={styles.drow}>
          <Text style={styles.label}>Add address</Text>
          <TextInput
            placeholder='Address'
            style={styles.input}
          />
        </View> */}
        <TouchableOpacity onPress={() => handleSignIn()} style={[styles.confirmbtn, { marginTop: 50, alignItems: 'center', justifyContent: 'center', paddingLeft: 0, backgroundColor: '#e7f8e6'}]}>
            <Text style={{ color: '#15B715', fontSize: 17 }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fdfdfd'
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  pic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'hidden'
  },
  drow: {
    marginBottom: 20,
    width: '85%',
  },
  label: {
    color: '#AAAAAA',
    fontSize: 12
  },
  input: {
    width: '100%',
    backgroundColor: '#EDEFF3',
    borderRadius: 218,
    height: 56,
    paddingLeft: 25,
    opacity: 0.7,
    marginBottom: 25
  },
  confirmbtn: {
    width: '85%',
    backgroundColor: '#15B715',
    borderRadius: 218,
    height: 56,
    paddingLeft: 25,
  },
})