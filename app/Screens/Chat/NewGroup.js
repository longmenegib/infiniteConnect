import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import DropDownPicker from 'react-native-dropdown-picker';
import Picker from '../../Components/Picker';


export default function NewGroupChat(){
  const navigation = useNavigation();
  const [dropOpen, setDropOpen] = useState(false);
  const [dropValue, setDropValue] = useState([]);

  const familyMem = [
    {label:'jean', value:'+23760000001', id:'0'},
    {label:'jean1', value:'+23760037002', id:'12'},
    {label:'jean2', value:'+23760090003', id:'3'},
    {label:'jean3', value:'+23760060004', id:'54'},
    {label:'jean4', value:'+23760040005', id:'65'},
    {label:'jean5', value:'+23760009006', id:'64'},
    {label:'jean6', value:'+23760008007', id:'65'},
    {label:'jean7', value:'+23760005008', id:'07'},
    {label:'jean8', value:'+23769000009', id:'70'}
  ]
  const [dropItems, setDropItems] = useState(familyMem);

  let pickerItems = [
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid'},
    {label: 'Barcelona', value: 'barcelona'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome'},

    {label: 'Finland', value: 'finland'}
  ];
  
  const ImgUrl = 'https://firebasestorage.googleapis.com/v0/b/memebit-x.appspot.com/o/photos%2Fmeme-troll-face.png?alt=media&token=b0e1c29a-8fc0-4729-a244-f05e5d1e331a';
  // pickerItems = pickerItems.map(item => {item.image = ImgUrl; return item})
  const initialValue = ['italy', 'spain', 'barcelona', 'finland'];
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity style={styles.pic}>
            <Image source={require('./../../Assets/icons/camera.png')} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
          <View style={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#28A7E3', marginTop: 60, marginLeft: -25 }}>
            <Image source={require('./../../Assets/icons/wedit.png')} style={{width: 15, height: 15}} />
          </View>
        </View>
        <View style={styles.drow}>
          <Text style={styles.label}>Name of Group</Text>
          <TextInput
            placeholder='Name of group'
            style={styles.input}
          />
        </View>
        {/* <View style={styles.drow}>
          <Text style={{ color: '#424242' }}>Add phone</Text>
          <TextInput keyboardType='phone-pad' placeholder="phone number" style={styles.phonearea} />
        </View> */}
        {/* <TouchableOpacity onPress={() => handleCreate()} style={styles.btn}>
          <Text style={{ color: 'white', fontSize: 18 }}>Add Member</Text>
        </TouchableOpacity> */}
        {/* <DropDownPicker
          multiple={true}
          min={0}
          max={5}
          open={dropOpen}
          setOpen={setDropOpen}
          placeholder="Select family members"
          items={dropItems}
          value={dropValue}
          setValue={setDropValue}
          containerStyle={{width:'85%'}}
          onSelectItem={(valueArr) => setDropValue(valueArr)}
          maxHeight={200}
          // onChangeValue={(value) => setDropValue(value)}
        /> */}
        <Picker
          pickerItems={pickerItems}
          initialValue={initialValue}
        />
        <TouchableOpacity style={styles.crtbtn}>
          <Text style={{ color: 'white', fontSize: 18 }}>Create Group</Text>
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
    backgroundColor: 'transparent'
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