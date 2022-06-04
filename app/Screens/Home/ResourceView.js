import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const ResourceView = () => {
    const fLData = [
        {id:1,title:'Financial aid', image:require('../../Assets/pics/finance.jpg')},
        {id:2,title:'Scholarships in engineering', image:require('../../Assets/pics/eng.jpg')},
        {id:3,title:'Family picnic', image:require('../../Assets/pics/fam.jpg')},
        {id:4,title:'Back to school', image:require('../../Assets/pics/kidschool.jpg')},
        {id:5,title:'How to manage your money', image:require('../../Assets/pics/finance.jpg')},
        {id:6,title:'We are better together', image:require('../../Assets/pics/fam.jpg')},
        {id:7,title:'Kid Graduations', image:require('../../Assets/pics/school.jpg')},
    ];

    const ResourceCard = ({item}) => {
        return (
            <View style={styles.card}>
                <Image style={styles.bigImage} source={item.image} />
                <Text style={{padding:8, marginHorizontal:20, fontSize:18, color:'black'}}>{item.title}</Text>
            </View>
        )
    };

    return (
        <View>
            <Text style={{margin:10, marginHorizontal:20, fontSize:16, alignSelf:'center'}}>
                View Resources
            </Text>
            <FlatList
                contentContainerStyle={{paddingVertical:40}}
                data={fLData}
                keyExtractor={item => item.id}
                renderItem={({item}) => <ResourceCard item={item} />}
            />
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
    }
})