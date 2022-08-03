import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, TextInput, Platform, Modal, ScrollView } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';
import ImagePicker from 'react-native-image-crop-picker';
import axios from '../../utils/axios';
import { baseURL } from '../../../utilis/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Header, Content, Picker, Form } from "native-base";

export default function ReportIssue({navigation}){
  // const navigation = useNavigation();
  const [image, setImage] = useState(null)
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDetails, setIssueDetails] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [agencies, setAgencies] = useState({});
  const [selected, setSelected] = useState(null);
  const [dropItems, setDropItems] = useState([1, 1, 2]);

  useEffect(()=>{
    getAgencies();
    return ()=>{
    }
  }, []);
  
  const getAgencies = async()=>{
    const user = await AsyncStorage.getItem('userToken')
    const token = JSON.parse(user).result.token;
    console.log("getting agencies", token)
    await axios.get('/family-api/agencies/', { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
        .then(async res => {
            if(res.data.results){
                console.log('results: ',res.data.results)
                setDropItems(res.data.results);
                setSelected(res.data.results[0].id);
            }
        }).catch(err => {
            console.log(err.request);
  
        })
    }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 0.8,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      this.bs.current.snapTo(1);
    });
  };

  const onIssueReport = async() => {
    if(issueTitle && issueDetails && selected) {
      let imgToUpload = null;
     
      console.log('starting query...');
      console.log('description: ', issueTitle);
      const dataSend = new FormData();
      dataSend.append('title', issueTitle);
      dataSend.append('description', issueDetails);
      dataSend.append('agency', selected);
      if (image) {
        imgToUpload = {
          type:'image/jpeg',
          name:image.split('/')[image.split('/').length-1],
          uri:image
        }
        dataSend.append('image', imgToUpload);
      }
      
      console.log(dataSend)
      // return
      const userToken = await AsyncStorage.getItem('userToken');
      let token = JSON.parse(userToken).result.token;
      await axios.post('/report-api/issues/', dataSend,
       { timeout: 10000, headers: {"Authorization": `Token ${token}`,'Content-Type':'multipart/form-data'},
       transformRequest:(data, headers) => {
        return dataSend;
      } })
        .then(async res=>{
          console.log('Report result: ', res);
          setShowModal(true)
        }).catch (error => {
          console.log('Error during the post: ', error.request)
          // console.log('Server status: ',error.response.status);
          // console.log("error: ",error.response.data.error);
          // setApiError(error.response.data.error);
        });
      // 
    }
  }

  const imageName = image ? image.split('/').pop() :null;

  function onValueChange(value) {
    setSelected(value.id)
  }
  
  const putModal = (show, navigation) => {
    return(
      <Modal animationType={"slide"} transparent={true} visible={show} >
        <View style = {styles.modalwrap}>
          <View style = {styles.modal}>
            <Image source={require('./../../Assets/icons/danger.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 25, color: 'black' }}>Report successful</Text>
            <Text style={{ textAlign: 'center', marginVertical: 10, width: '90%', color: '#424242' }}>The issue have been reported successfully
                {/* <Text style={{ fontWeight: 'bold' }} >15 years</Text> old. */}
                </Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.sendbtn}>
              <Text style={{ color: 'white' }}>Go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <ScrollView style={{flex: 1,}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 10, left: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <Text style={{ color: 'black' }}>Report issue</Text>
        </View>
      </View>
      <View style={styles.body}>

      <Text style={{ textAlign: 'left', color: '#424242' }}>Select the agency</Text>
      <View style={styles.inputContainer}>
              {/* <View style={styles.labelContainer}>
                <Text style={{color:'#777'}}>Agency</Text>
              </View> */}
              <View style={{flexDirection:'row', alignItems:'center'}}>
              <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Select Agency"
              placeholderStyle={{ color: "#000" }}
              placeholderIconColor="#000"
              style={{ width: '100%', height: 40,zIndex: 20,flex: 1, position: 'absolute', color: '#000',}}
              selectedValue={selected}
              onValueChange={onValueChange}
            >
              {dropItems.map((ele, index)=>{
                return(
                  <Picker.Item key={index} label={ele.name} value={ele.id} />
                )
              })}
            </Picker>
          </Form> 
              </View>
            </View>


        <TextInput
          placeholder='What is your issue about?'
          style={[styles.textarea, {minHeight:40, textAlignVertical:'center'}]}
          onChangeText={(text) => setIssueTitle(text)}
          placeholderTextColor='gray'
        />

        <Text style={{ textAlign: 'left', color: '#424242' }}>Describe your issue in detail</Text>
        <TextInput
          multiline
          placeholder='Describe your issue'
          style={styles.textarea}
          onChangeText={(text) => setIssueDetails(text)}
          placeholderTextColor='gray'
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity onPress={choosePhotoFromLibrary} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 30, marginRight: 7, height: 30, borderRadius: 15, backgroundColor: '#15B715', alignItems: 'center', justifyContent: 'center', overflow:'hidden'}}>
              <Image source={image? {uri:image} : require('./../../Assets/icons/picture.png')} style={[styles.back, image?{width:'100%', height:'100%'} : null]} />
            </View>
            <Text style={{ color: '#999' }}>Attachment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onIssueReport} style={styles.send}>
            <Text style={{ color: 'white', fontSize: 15, marginRight: 7 }}>Send</Text>
            <Image source={require('./../../Assets/icons/plane.png')} style={styles.back} />
          </TouchableOpacity>
        </View>
        {imageName ? <Text style={{marginTop:10}}>{imageName}</Text>:null}
        {/* <TouchableOpacity style={styles.callbtn}>
          <Image source={require('./../../Assets/icons/phone.png')} style={[styles.back, { width: 25, height: 25, marginRight: 10 }]} />
          <Text style={{ color: 'white', fontSize: 17 }}>Emergency Call</Text>
        </TouchableOpacity> */}
      </View>
      {putModal(showModal, navigation)}
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
    // flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
    marginTop: 60
  },
  textarea: {
    width: '100%',
    minHeight: 200,
    maxHeight: 250,
    backgroundColor: '#eff8fd',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28A7E3',
    textAlignVertical: 'top',
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    color: '#424242'
  },
  send: {
    backgroundColor: '#15B715',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    flexDirection: 'row'
  },
  callbtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15B715',
    marginTop: 45,
    height: 50,
    borderRadius: 40
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
  labelContainer: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    marginLeft:30,
    shadowColor: 'white', 
    position: 'absolute',
    top: -12,

  },
  inputContainer: {
    borderWidth: 1,
    borderColor:'#28A7E3',
    borderRadius: 10,
    // paddingHorizontal: 8,
    // zIndex: 0,
    position: 'relative',
    height: 50,
    marginTop: 10,
    backgroundColor: '#eff8fd',
  },
})