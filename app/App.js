import React from 'react';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import { AsyncStorage, Image, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createTabNavigator } from 'react-navigation-tabs';

import Auth from './Screens/Auth';

import FirstStepper from './Screens/Splash/FirstStepper';
import SecondStepper from './Screens/Splash/SecondStepper';
import UserSignIn from './Screens/Splash/UserSignIn';
import GuestSignIn from './Screens/Splash/GuestSignIn';

import Home from './Screens/Home';
import PersonalInformation from './Screens/PersonalInformation';
import Chat from './Screens/Chat';
import Notifications from './Screens/Notifications';

import MyFamily from './Screens/Home/MyFamily';
import CreateFamily from './Screens/Home/CreateFamily';
import ViewFamily from './Screens/Home/ViewFamily';
import InitFamily from './Screens/Home/InitFamily';
import ReportIssue from './Screens/Home/ReportIssue';
import LifeStory from './Screens/Home/LifeStory';
import ParentInformation from './Screens/Home/ParentInformation';
import Resources from './Screens/Home/Resources';

import NewGroupChat from './Screens/Chat/NewGroup';
import UserConvo from './Screens/Chat/UserConvo';
import GroupConvo from './Screens/Chat/GroupConvo';

const customTextProps = {
  style: {
    fontSize: 14,
    fontFamily: 'poppins',
    color: "#232B3B"
    // color: 'white'
  }
};

const customTextInputProps = {
  placeholderTextColor: "gray",
  style: {
    borderWidth: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    color: "#424242"
  }
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

const HomeStack = createStackNavigator({
  Home: Home,
  MyFamily: MyFamily,
  CreateFamily: CreateFamily,
  ViewFamily: ViewFamily,
  InitFamily: InitFamily,
  ReportIssue: ReportIssue,
  LifeStory: LifeStory,
  ParentInformation: ParentInformation,
  Resources: Resources,
},{
  defaultNavigationOptions: {
    headerShown: false
  }
});

const ChatStack = createStackNavigator({
  Chat: Chat,
  NewGroupChat: NewGroupChat,
  UserConvo: UserConvo,
  GroupConvo: GroupConvo
},{
  defaultNavigationOptions: {
    headerShown: false
  }
});


const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={ focused ? require('./Assets/pics/homed.png') :  require('./Assets/pics/home.png')}
              style={{ width: 25, height: 25, marginTop: 10}} />
            {focused ? <Text style={{ color: '#28A7E3', fontSize: 10 }}>Home</Text> : <Text style={{ color: '#AAAAAA', fontSize: 10 }}>Home</Text>}
          </View>
        )
      }
    },
    Chat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={ focused ? require('./Assets/pics/chatd.png') : require('./Assets/pics/chat.png') }
              style={{ width: 25, height: 25, marginTop: 10 }} />
            {focused ? <Text style={{ color: '#28A7E3', fontSize: 10 }}>Chat</Text> : <Text style={{ color: '#AAAAAA', fontSize: 10 }}>Chat</Text>}
          </View>
        )
      }
    },
    Notification: {
      screen: Notifications,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={ focused ? require('./Assets/pics/belld.png') : require('./Assets/pics/bell.png') }
              style={{ width: 25, height: 25, marginTop: 10 }} />
              {focused ? <Text style={{ fontSize: 10, color: '#28A7E3' }}>Notifications</Text> : <Text style={{ fontSize: 10, color: '#AAAAAA' }}>Notifications</Text>}
          </View>
        )
      }
    },
    Profile: {
      screen: PersonalInformation,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={ focused ? require('./Assets/pics/userd.png') : require('./Assets/pics/user.png') }
              style={{ width: 25, height: 25, marginTop: 10 }} />
              {focused ? <Text style={{ fontSize: 10, color: '#28A7E3' }}>My</Text> : <Text style={{ fontSize: 10, color: '#AAAAAA' }}>My</Text>}
          </View>
        )
      }
    },
  },
  {
    defaultNavigationOptions: () => ({
      swipeEnabled: true,
      adaptive: true,
      // tabBarVisible: (navigation.state.index > 0) ? false : true
    })
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if(navigation.state.index > 0) {
    tabBarVisible = false;
  };

  return {
    tabBarVisible,
  };
};

ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if(navigation.state.index > 0) {
    tabBarVisible = false;
  };

  return {
    tabBarVisible,
  };
};


const AuthStack = createStackNavigator(
  {
    First: FirstStepper,
    Second: SecondStepper,
    UserSignIn: UserSignIn,
    GuestSignIn: GuestSignIn
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        display: 'none',
      },
      headerShown: false
    },
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: Auth,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
