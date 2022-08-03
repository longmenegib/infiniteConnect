import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput, Alert } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';
import DropDownPicker from 'react-native-dropdown-picker';
import Picker from '../../Components/Picker';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner, Icon} from 'native-base';


export default function NewGroupChat({navigation}){

  const [open, setOpen] = useState(false);
  const [families, setFamilies] = useState([{label: '', value: ''}]);
  const [value, setValue] = useState([]);
  const initialValue = [];
  const [creating, setCreating] = useState(false);

  const [name, setName]=useState("");


  const getFamilies = async() => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken);
    let token = JSON.parse(userToken).result.token;
    await axios.get('/user-api/kids/family-members', { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        // console.log('this is my family ',res.data.family_members);
        // setFamilies(res.data.family_members);
        let arrfa = []
        for (let index = 0; index < res.data.family_members.length; index++) {
          const element = res.data.family_members[index];
          const el = {label: element.username, value: element.username}
          arrfa.push(el);
        }
        setFamilies(arrfa);
        console.log(arrfa)
        // setLoad(false)
      }).catch(err=>{
        console.log(err.request);
      })
  }

  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  useEffect(() => {
    getFamilies()
  }, [])  

  const createGroup = async()=>{
    
    if(!name){
      return Alert.alert("Oops","Group name is required")
    }
    if(value.length < 3){
      return Alert.alert("Error","Select atleast 2 participants")
  }
  setCreating(true)
    let userToken = await AsyncStorage.getItem('userToken');

   
    let token = JSON.parse(userToken).result.token;
    let id=JSON.parse(userToken).result.kid.user
    console.log([...value, id]);
    // return;
    await axios.post('/chat-api/create-chat', {participants: [...value, id], name: name}, { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        console.log('Chat created', res);
        setCreating(false)
      }).catch(err=>{
        console.log(err.request);
        setCreating(false)
      })
  }


  return(
    <ImageBackground source={require('./../../Assets/bg.png')} style={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginLeft: -20 }}>
          <Text style={{ color: 'black' }}>New Group</Text>
        </View>
      </View>
      <View style={styles.body}>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity style={styles.pic}>
            <Image source={require('./../../Assets/icons/camera.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <View style={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#28A7E3', marginTop: 60, marginLeft: -25 }}>
            <Image source={require('./../../Assets/icons/wedit.png')} style={{width: 15, height: 15}} />
          </View>
        </View> */}
        <View style={styles.drow}>
          <Text style={styles.label}>Name of Group</Text>
          <TextInput
            placeholder='Name of group'
            style={styles.input}
            value={name}
            onChangeText={(text)=> setName(text)}
          />
        </View>
        {/* <Picker
          pickerItems={families}
          // initialValue={[families[0]]}
        /> */}

        <DropDownPicker
          open={open}
          value={value}
          items={families}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setFamilies}
          // schema={{
          //     label:'label',
          //     value:'value',
          //     icon:'image'
          // }}
          // theme="DEFAULT"
          style={{backgroundColor:"rgba(40, 167, 227, 0.1)", borderColor:'#28A7E3'}}
          multiple={true}
          mode="BADGE"
          badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
          containerStyle={{width:'85%'}}
        />

        <TouchableOpacity style={styles.crtbtn} onPress={createGroup}>
        {creating ? 
          <Spinner color="white"/>
          :
          <Text style={{ color: 'white', fontSize: 18 }}>Create Group</Text>
        }
          
          
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  pic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  drow: {
    marginBottom: 40,
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
    backgroundColor: 'transparent',
    color: 'gray'
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: '#15B715',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: '10%',
    borderRadius: 20,
  },
  crtbtn: {
    width: '85%',
    height: 56,
    backgroundColor: '#28A7E3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 218,
    marginTop: 30
  },
  phonearea: {
    // height: 100,
    color: 'green',
    // textAlignVertical: 'top',
    paddingLeft: 15,
    paddingVertical:7,
    alignItems: 'flex-start',
    width: '100%',
    borderColor: '#15B715',
    borderWidth: 0.7,
    marginBottom: 15,
    borderRadius: 6,
    marginTop: 5
  }
})