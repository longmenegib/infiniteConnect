import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';

import MainApp from './app/App';
import AuthContextProvider from './app/Context.js/authContext';


export default function App() {
  return (
    <AuthContextProvider>
      <SafeAreaView  style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MainApp name="Infinity" />
        </View>
      </SafeAreaView>
    </AuthContextProvider>
  );
};

