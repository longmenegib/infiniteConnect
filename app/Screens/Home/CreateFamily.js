import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ImageBackground, Platform } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { baseURL } from '../../../utilis/urls';
import ImagePicker from 'react-native-image-crop-picker';
import { authContext } from '../../Context.js/authContext';

export default function CreateFamily(){
  const navigation = useNavigation();
  const [familyName, setFamilyName] = useState('');
  const [familyAddress, setFamilyAddress] = useState('');
  const [apiError, setApiError] = useState('');
  const [image, setImage] = useState(null);
  const {user} = useContext(authContext);

  const handleCreate = async() => {
    setApiError('');
    
    if (familyName&& familyAddress) {
      let imgToUpload = null;
      if (image) {
        imgToUpload = {
          type:'image/jpeg',
          name:image.split('/')[image.split('/').length-1],
          uri:image
        }
      }

      const toTransfer = new FormData();
      toTransfer.append('family_name', familyName);
      toTransfer.append('address', familyAddress);
      toTransfer.append('image', imgToUpload);
      try {
        console.log('Image: ', image)
        let result= await (await axios.post(baseURL+'family-api/families/',
          toTransfer,
          {
            headers:{'Content-Type':'multipart/form-data'},
            transformRequest:(data, headers) => {
              return toTransfer;
            }
          }  
          )).data
        // if (image) {
        //   await axios.put(baseURL+`family-api/families/${result.id}/`, {image:image});
        // }
        console.log('Query result: ', result);
        navigation.navigate('InitFamily', {familyObj: JSON.stringify(result)});
      } catch (error) {
        if (error.response.status ==400) {
          setApiError(error.response.data.error);
        } else {
          setApiError('an error occured')
        }
        console.log('Error during the post: ', error.response.data.error);
        console.log('Server status: ',error.response.status);
        console.log("error: ",error.message);
      }
    }
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      compressImageQuality: 0.8,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
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
          <TouchableOpacity style={styles.pic} onPress={choosePhotoFromLibrary}>
            <Image source={ image? {uri:image}: require('./../../Assets/icons/camera.png')} style={image?{width:100, height:100}:{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#28A7E3', marginTop: 60, marginLeft: -25 }}>
            <Image source={require('./../../Assets/icons/wedit.png')} style={styles.back} />
          </View>
        </View>
        <View style={styles.drow}>
          <Text style={styles.label}>Name of family</Text>
          <TextInput
            placeholder='Name of family'
            style={styles.input}
            onChangeText={(text) => setFamilyName(text)}
          />
        </View>
        <View style={styles.drow}>
          <Text style={styles.label}>Add address</Text>
          <TextInput
            placeholder='Address'
            style={styles.input}
            onChangeText={(text)=> setFamilyAddress(text)}
          />
        </View>
        {apiError? <Text style={{margin:5, color:'red'}}>{apiError}</Text>:null}
        <TouchableOpacity onPress={() => handleCreate()} style={styles.btn}>
          <Text style={{ color: 'white', fontSize: 18 }}>Create</Text>
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
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 0.7,
    backgroundColor: 'transparent'
  },
  btn: {
    width: '85%',
    height: 56,
    backgroundColor: '#15B715',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 218,
  }
})