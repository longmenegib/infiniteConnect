import React from 'react';
import { StatusBar, View, Platform } from 'react-native';

export default function Statusbar(props){
    const height = (Platform.OS === 'ios') ?  20 : 0; 
    const {backgroundColor} = props;

    return (
        <View style={{height, backgroundColor}}>
            <StatusBar {...props} />
        </View>
    )
}