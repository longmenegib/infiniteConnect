import React, {useContext} from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';
import { AuthContext } from '../../context/AuthContext';

export default function SecondStepper({navigation}){
  // const navigation = useNavigation();
  const {setIskIdAccount} = useContext(AuthContext);

  const gotoSignIn = (type)=>{
    if(type === 1){
      setIskIdAccount(true);
      navigation.navigate('UserSignIn')
    }else{
      setIskIdAccount(false);
      navigation.navigate('GuestSignIn')
    }
  }

  return(
    <View style={styles.main}>
      <StatusBar hidden={false} backgroundColor="#232B3B" />
      <Image style={styles.logo} source={require('./../../Assets/Logo/icone.png')} />
      <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Are you</Text>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => gotoSignIn(1)} style={styles.pbtn}>
          <Image source={require('./../../Assets/icons/user.png')} style={styles.icon} />
          <Text style={{ color: 'white', fontStyle: 'italic', fontWeight: 'bold' }}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => gotoSignIn(0)} style={styles.btn}>
          <Image source={require('./../../Assets/icons/guest.png')} style={styles.icon} />
          <Text style={{ color: '#28A7E3', fontStyle: 'italic', fontWeight: 'bold' }}>Invited</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 100 }}>
        <View style={styles.dot} />
        <View style={styles.adot} />
        <View style={styles.dot} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#232B3B',
    justifyContent: 'center'
  },
  section: {
    paddingVertical: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  dot:{ 
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#aaa',
    marginHorizontal: 4
  },
  adot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#efefef',
    marginHorizontal: 4
  },
  pbtn: {
    width: 100,
    height: 100,
    backgroundColor: '#28A7E3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  btn: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 7
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'stretch'
  }
})