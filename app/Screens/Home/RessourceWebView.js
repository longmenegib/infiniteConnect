import React from 'react'
import { WebView } from 'react-native-webview';

export default function RessourceWebView({navigation, route}) {

  const {ressource}=route.params;
  console.log(ressource)
  return (
     <WebView source={{ uri: ressource.permalink ? ressource.permalink : 'https://www.google.com' }} />
  )
}
