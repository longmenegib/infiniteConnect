import React, { useEffect, useState,useContext } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, Modal, TouchableOpacity, Platform, ScrollView } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';
import { AuthContext } from '../context/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../utils/axios';
import { AccessContext } from '../context/AccessContext';


export default function PersonalInformation({navigation}){
  // const navigation = useNavigation();
  const [rend, setRend] = useState(1);
  const [show, setShow] = useState(false);
  const [image, setImage]= useState(null);
  const [user,setUser] = useState({})

  const {setisLoggedIn} = useContext(AccessContext);
  const {setIskIdAccount} = useContext(AuthContext)

  useEffect(()=>{
    const getAccount = async()=>{
      const usertoken = await AsyncStorage.getItem('userToken')
      console.log(usertoken);
      setUser(JSON.parse(usertoken).result.kid);
    }
    getAccount();
  }, [])

  const putbtnStyle = (e) => {
    if(e == rend){
      return { width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#28A7E3', borderRadius: 4 }
    }else{
      return { width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }
    }
  }

  const putxtStyle = (e) => {
    if(e == rend){
      return { color: 'white', fontWeight: 'bold' }
    }else{
      return {color: 'black'}
    }
  }

  const onSignOut = async() => {
    await AsyncStorage.removeItem('userToken');
    setisLoggedIn(false);
  }

  const updateProfilePic = async (imgPath) => {
    const toTransfer = new FormData();
    const imgToUpload = {
      type:'image/jpeg',
      name:imgPath.split('/')[imgPath.split('/').length-1],
      uri:imgPath
    }

    // toTransfer.append('username', user.user)

    toTransfer.append('image', imgToUpload)
    try {
    const result = await axios.patch('/user-api/users/'+ user.user_id+'/', toTransfer, 
    {
      headers:{'Content-Type':'multipart/form-data'},
      transformRequest:(data, headers) => {
        return toTransfer;
      }
    }  
    ).data
    console.log('result: ', result);
    setImage(imgPath)
  } catch (error) {
    console.log("error: ",error.request);
  }
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
      updateProfilePic(imageUri);
    });
  };

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
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setRend(1)} style={putbtnStyle(1)}>
            <Text style={putxtStyle(1)}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => [setRend(2), setShow(true)]} style={putbtnStyle(2)}>
            <Text style={putxtStyle(2)}>Life Story</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => [setRend(3)]} style={putbtnStyle(3)}>
            <Text style={putxtStyle(2)}>Medical Infos</Text>
          </TouchableOpacity>
        </View>

        {rend===1 && 
        <>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 35 }}>
            <TouchableOpacity onPress={choosePhotoFromLibrary} style={styles.pic}>
              <Image source={image? {uri:image}: (user.image&&{uri:user.image} ||require('./../Assets/icons/camera.png'))} style={{ width: 100, height:100 }} />
            </TouchableOpacity>
            <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#28A7E3', marginTop: 60, marginLeft: -50 }}>
              <Image source={require('./../Assets/icons/wedit.png')} style={styles.back} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginLeft:10 }}>{user?.first_name? user.first_name:'No' +'  '+ user?.last_name? user?.last_name:'Name'}</Text>
            {/* <Text style={{ fontSize: 16, color: '#424242' }}>Buea, Santa</Text>
            <Text style={{ color: '#999999' }}>This is the biography of this weird dude that I don't even know or like.</Text> */}
          </View>
        </View>
        {/* {image ?
        <TouchableOpacity onPress={updateProfilePic} style={{ marginTop:-20}}>
          <View style={{alignSelf:'flex-end', backgroundColor:'#28A7E3', padding:10, borderRadius:5}}>
              <Text style={{color:'white'}}>Confirm Profile</Text>
          </View>
        </TouchableOpacity>
      :null  
      } */}
        <View style={{ paddingVertical: 10, width: '100%', borderBottomColor: '#aaa', borderBottomWidth: 0.5 }}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.val}>{user?.sex}</Text>
        </View>
        <View style={{ paddingVertical: 10, width: '100%', borderBottomColor: '#aaa', borderBottomWidth: 0.5 }}>
          <Text style={styles.label}>Date of birth</Text>
          <Text style={styles.val}>{birthdate.toLocaleDateString("en-US", dateOptions)}</Text>
          <View style={{ marginTop: 5 }} />
          <Text style={styles.label}>Phonenumber</Text>
          <Text style={styles.val}>{user?.phone ? user.phone:""}</Text>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.val}>{user?.email ? user.email:"No email"}</Text>
          <Text style={styles.label}>Date of arrival</Text>
          <Text style={styles.val}>{user?.date_of_arrival ? user.date_of_arrival:""}</Text>
          {/* <Text style={styles.label}>E-mail</Text>
          <Text style={styles.val}>{user?.email ? user.email:"No email"}</Text> */}

        </View>
        <TouchableOpacity onPress={onSignOut} style={{ marginTop:20, alignSelf:'flex-start'}}>
          <View style={{alignSelf:'flex-end', backgroundColor:'#28A7E3', paddingVertical:10, paddingHorizontal:20, borderRadius:5}}>
              <Text style={{color:'white'}}>log out</Text>
          </View>
        </TouchableOpacity>
        </>
      }
      {rend === 3 && 
      <>

      </>}
      </ScrollView>
      
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
    // backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 4,
    justifyContent: 'space-between'
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
    borderRadius:50,
    overflow:'hidden'
  },
  label: {
    fontWeight: 'bold',
    color: '#999999',
    marginBottom: 5,
    marginTop: 10
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
  },
  back: {
    width: 20,
    height: 20
  },
});