/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import { 
  NavigationContainer,
   useFocusEffect
   } from '@react-navigation/native'
   import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/AntDesign'
import Octicon from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Button,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './Pages/Home';
import basketLogin from './Pages/basketLogin';
import Create from './Pages/Create'
import Landing from './Pages/Landing'
import Register from './Pages/Register'
import Basket from './Pages/Basket'
import {styles} from './AllStyles'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

 function Tabnavigator () {
  return(
    <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      activeTintColor: '#f6f881',
      style :{
        position: 'absolute',
        bottom: 25,
        left: 70,
        right: 70,
        borderRadius: 35,
        height: 70,
        backgroundColor: '#222229',
        elevation: 0,
        borderTopWidth: 0,     // TO GET RID OFF WHITE LINE ON TOP 
        
      }
    }}>
      <Tab.Screen  name='Home' component={Home} options={{
        tabBarIcon: ({color}) => <Icon name='home' size={32} color={color} />
      }}/>
      <Tab.Screen  name='Create' component={Create} options={{
        tabBarIcon: ({color}) => <Octicon name='plus' size={32} color={color}/>
      }}/>
      <Tab.Screen  name='Browse' component={basketLogin} options={{
        tabBarIcon: ({color}) => <Ionicons name='md-log-in-outline' size={36} color={color} />
      }}/>
    </Tab.Navigator>
  )
};



function App () {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {

        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        
        if (state !== undefined) {
          setInitialState(state);
          
        }

      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return(
    <NavigationContainer 
    initialState={initialState}
      onStateChange={(state) =>

        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))

      }
    >
      <Stack.Navigator initialRouteName='Landing' headerMode='none' >
        <Stack.Screen name='Tabnavigator' component={Tabnavigator} /> 
        <Stack.Screen name='Landing' component={Landing}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Basket' component={Basket}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
