import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';

import MainApp from './app/App';


export default function App() {
  return (
    <SafeAreaView  style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MainApp name="Infinity" />
      </View>
    </SafeAreaView>
  );
};

