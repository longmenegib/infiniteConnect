import React, {useState, useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base';

const ResourceView = ({navigation, route}) => {
    const fLData = [
        {id:1,title:'Financial aid', image:require('../../Assets/pics/finance.jpg')},
        {id:2,title:'Scholarships in engineering', image:require('../../Assets/pics/eng.jpg')},
        {id:3,title:'Family picnic', image:require('../../Assets/pics/fam.jpg')},
        {id:4,title:'Back to school', image:require('../../Assets/pics/kidschool.jpg')},
        {id:5,title:'How to manage your money', image:require('../../Assets/pics/finance.jpg')},
        {id:6,title:'We are better together', image:require('../../Assets/pics/fam.jpg')},
        {id:7,title:'Kid Graduations', image:require('../../Assets/pics/school.jpg')},
    ];

    const [families, setFamilies] = useState([]);
    const [loading, setIsloading]= useState(true)

    const {category, image} = route.params;
  
  const getFamilies = async() => {
    let userToken = await AsyncStorage.getItem('userToken');
    // console.log(category)
    let token = JSON.parse(userToken).result.token;
    setIsloading(true);
    console.log("getting...")
    await axios.get(`/ressource-api/ressource-types/${category.id}/ressources`, { timeout: 10000, headers: {"Authorization": `Token ${token}`} })
      .then(async res => {
        console.log('hellowwww',res.data.results);
        setFamilies(res.data.results.ressources)
        setIsloading(false)
      }).catch(err=>{
        console.log(err.request);
        setIsloading(false)
      })
  }

  useEffect(() => {
    getFamilies()
  }, [])


    const ResourceCard = ({item}) => {
        return (
          <TouchableWithoutFeedback onPress={()=> navigation.navigate('RessourceWebView', {ressource: item})}>
            <View style={styles.card}>
                <Image style={styles.bigImage} source={{uri: item.image}} />
                <Text style={{padding:8, marginHorizontal:20, fontSize:18, color:'black'}}>{item.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
    };

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{padding: 10}}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 10, left: 10 }}>
          <Image source={require('./../../Assets/icons/back.png')} style={styles.back} />
        </TouchableOpacity>
            <Text style={{fontSize:16, alignSelf:'center'}}>
                {category.label}
            </Text>
            </View>
            {loading ?
            <View style={styles.main}>
                <Spinner color="blue"/>
            </View>
            :
            <>
            {families.length<1 ?
                <View style={styles.main}>
                <Image source={require('../../Assets/icons/error.png')} style={{ width: 70, height: 70 }} />
                <Text style={{ marginTop: 15, fontWeight: 'bold', color: 'gray', fontSize: 18 }}>You have no resources</Text>
                
              </View>
                :
                <FlatList
                contentContainerStyle={{paddingVertical:40}}
                data={families}
                keyExtractor={item => item.id}
                renderItem={({item}) => <ResourceCard item={item} />}
                />
            }
                   
        </>
            }
           
        </View>
    )
};

export default ResourceView;

const styles = StyleSheet.create({
    card:{
        backgroundColor:"rgba(40, 167, 227, 0.1)",
        marginVertical:20,
        width:'90%',
        alignSelf:'center',
        borderRadius:20,
        overflow:'hidden',
        elevation:0.2
    },
    bigImage:{
        width:'100%',
        height:250,
        borderRadius:15,
    },
    main: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      },
      back: {
        width: 20,
        height: 20
      },
     
})