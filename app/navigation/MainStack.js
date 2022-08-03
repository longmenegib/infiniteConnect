import React, {useContext,useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AsyncStorage} from 'react-native'/

import {AccessContext} from '../context/AccessContext';
import { AuthContext } from '../context/AuthContext';

import MainTab from './MainTab';


import FirstStepper from '../Screens/Splash/FirstStepper';
import SecondStepper from '../Screens/Splash/SecondStepper';
import UserSignIn from '../Screens/Splash/UserSignIn';
import GuestSignIn from '../Screens/Splash/GuestSignIn';

import Chat from '../Screens/Chat';
import MyFamily from '../Screens/Home/MyFamily';
import CreateFamily from '../Screens/Home/CreateFamily';
import ViewFamily from '../Screens/Home/ViewFamily';
import InitFamily from '../Screens/Home/InitFamily';
import ReportIssue from '../Screens/Home/ReportIssue';
import LifeStory from '../Screens/Home/LifeStory';
import ParentInformation from '../Screens/Home/ParentInformation';
import Resources from '../Screens/Home/Resources';
import ResourceView from '../Screens/Home/ResourceView';
import Notifications from '../Screens/Notifications';

import NewGroupChat from '../Screens/Chat/NewGroup';
import UserConvo from '../Screens/Chat/UserConvo';
import GroupConvo from '../Screens/Chat/GroupConvo';
import GuestMore from '../Screens/Splash/GuestMore';
import SelectChat from '../Screens/Chat/SelectChat';


import SplashScreen from 'react-native-splash-screen'
import RessourceWebView from '../Screens/Home/RessourceWebView';


const Stack = createStackNavigator()


const MainStack = () => {
  

  const {isLoggedIn, setisLoggedIn} = useContext(AccessContext);
  const {IsKidAccount, setIskIdAccount} = useContext(AuthContext);
  const [loading, setIsLoading] = useState(true);


  useEffect(()=>{
    bootstrapAsync();
 
  }, []);

  const bootstrapAsync = async () => {
   
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken)
    if(userToken){
        console.log("im logged in");
        setisLoggedIn(true);
        if(JSON.parse(userToken).result.user_data){
            setIskIdAccount(false);
            // console.log("family account")
          }else{
            // console.log('kid account')
            setIskIdAccount(true);
          }
    }else{
        setisLoggedIn(false);
        console.log("not logged in")
    }
    setIsLoading(false)
    SplashScreen.hide();
  };

  if(loading){
    return null
  }

    return (
        <Stack.Navigator
            screenOptions={{headerShown:false}}
            // initialRouteName={!IsKidAccount ? 'MainTab' : 'GuestChat'}
        >
            {/* <Stack.Screen name="Auth" component={Auth} /> */}
                    
            {isLoggedIn ? (
                <>
                {IsKidAccount ?(
                <>
                     <Stack.Screen name="MainTab" component={MainTab} />
                    {/* <Stack.Screen name="GuessChat" component={Chat} /> */}
                    <Stack.Screen name="MyFamily" component={MyFamily} />
                    <Stack.Screen name="CreateFamily" component={CreateFamily} />
                    <Stack.Screen name="ViewFamily" component={ViewFamily} />
                    <Stack.Screen name="InitFamily" component={InitFamily} />
                    <Stack.Screen name="ReportIssue" component={ReportIssue} />
                    <Stack.Screen name="LifeStory" component={LifeStory} />
                    <Stack.Screen name="ParentInformation" component={ParentInformation} />
                    <Stack.Screen name="Resources" component={Resources} />
                    <Stack.Screen name="ResourceView" component={ResourceView} />
                    <Stack.Screen name="NewGroupChat" component={NewGroupChat} />
                    <Stack.Screen name="UserConvo" component={UserConvo} />
                    <Stack.Screen name="GroupConvo" component={GroupConvo} />
                    <Stack.Screen name="GuestMore" component={GuestMore} />
                    <Stack.Screen name="Notifications" component={Notifications} />
                    <Stack.Screen name="SelectChat" component={SelectChat} />
                    <Stack.Screen name="RessourceWebView" component={RessourceWebView} />
                </>)
                :
                (<>
                    <Stack.Screen name="GuessChat" component={Chat} />
                    <Stack.Screen name="UserConvo" component={UserConvo} />
                    <Stack.Screen name="GroupConvo" component={GroupConvo} />
                </>
                )} 
                </>
            )
                 :
                 (
                 <>
                    <Stack.Screen name="FirstStepper" component={FirstStepper} />
                    <Stack.Screen name="SecondStepper" component={SecondStepper} />
                     <Stack.Screen name="UserSignIn" component={UserSignIn} />
                     <Stack.Screen name="GuestSignIn" component={GuestSignIn} />
                 </>
                 )}           
            
        </Stack.Navigator>
    )
}

export default MainStack;