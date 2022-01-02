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
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { SafeAreaProvider, } from 'react-native-safe-area-context'
import React, { useState} from 'react';
import {
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './Pages/Home';
import basketLogin from './Pages/basketLogin';
import Create from './Pages/Create'
import Landing from './Pages/Landing'
import Register from './Pages/Register'
import Basket from './Pages/Basket'
import Login from './Pages/Login'
import OnboardingScreen from './Pages/OnboardingScreen'
import HelpScreen from './Pages/HelpScreen'

import ChoiceButton from './elements/choiceButton'
import {styles} from './AllStyles'
import SplashScreen from 'react-native-splash-screen'

import 'react-native-gesture-handler'
import signOut from './Pages/SignOut'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

 function Tabnavigator ({navigation}) {

  const [buttonActive, setButtonActive] = useState(false)
  
  const buttonChange = () => {
    setButtonActive(!buttonActive)
  }

  return(

    <> 
    <View style={[styles.choiceView, buttonActive && {width:250}]}>
      
      <ChoiceButton navigation={navigation} onPress={buttonChange}/>
      
  </View>
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: '#FF9C33',
      headerShown: false,
      tabBarStyle: {
        
        position: 'absolute',
        bottom: 25,
        left: 70,
        right: 70,
        borderRadius: 35,
        height: 70,
        backgroundColor: 'transparent',
        elevation: 0,
        borderTopWidth: 0,     // TO GET RID OFF WHITE LINE ON TOP 
      }
    }}
    >
      <Tab.Screen  name='Home' component={Home} options={{
        tabBarIcon: ({color}) => <Icon name='home' size={32} color={color} />,
        tabBarIconStyle: {left: -20}

      }}/>
      
      <Tab.Screen  name='Logout' component={signOut} options={{
        tabBarIcon: ({color}) => <MaterialIcons name='logout' size={31} color={color} />,
        tabBarIconStyle: {left: 20},
        
      }}/>
    </Tab.Navigator>
    </>
  )
};



function App () {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  React.useEffect(() => {
    const restoreState = async () => {
      try {

        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        
        if (state !== undefined) {
          setInitialState(state);
          setTimeout(() => {SplashScreen.hide()}, 2000)
        }

      } finally {
        setIsReady(true);
        setTimeout(() => {SplashScreen.hide()}, 2000)
        
      }
    };

    const firstLaunchData = async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }

    // AsyncStorage.removeItem('isAppFirstLaunched');
    }

    if (!isReady) {
      firstLaunchData()
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return(
    isAppFirstLaunched != null && (
    <SafeAreaProvider>
      
    <NavigationContainer 
    initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }>
      <Stack.Navigator  screenOptions={{
        headerShown: false, 
        gestureEnabled: true, 
        gestureDirection: 'horizontal',
        animationTypeForReplace: 'pop'
        }} >
          {isAppFirstLaunched && (
            <Stack.Screen name='Onboarding' component={OnboardingScreen}/>
          )}
        <Stack.Screen name='Tabnavigator' component={Tabnavigator} options={{ gestureEnabled: false }}/> 
        <Stack.Screen name='Landing' component={Landing}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Basket' component={Basket} options={{ gestureEnabled: false }}/>
        <Stack.Screen name='createBasket' component={Create}/>
        <Stack.Screen name='loginBasket' component={basketLogin}/>
        <Stack.Screen name='helpScreen' component={HelpScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
    
    </SafeAreaProvider>
    )
  )
}

export default App;
