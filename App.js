import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthContextProvider from './app/context/AuthContext';
import MainStack from './app/navigation/MainStack';
import AccessProvider from './app/context/AccessContext';

export default function App() {
  return (
    <AccessProvider>
      <AuthContextProvider>
        
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
      
      </AuthContextProvider>
    </AccessProvider>
  );
};

