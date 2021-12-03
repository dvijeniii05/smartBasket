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
    TextInput,
    
  
  } from 'react-native';

  import Home from '../Pages/Home';

  import {styles} from '../AllStyles'

  import auth from '@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore'
  import firebase from '@react-native-firebase/app'

  import AsyncStorage from '@react-native-async-storage/async-storage'

  const db = firebase.firestore()
  const collectionRef = db.collection('users')
  const {width: WIDTH} = Dimensions.get('window');
  const {height: HEIGHT} = Dimensions.get('window')

  function signOutFunc () {
    auth()
 .signOut()
 .then(() => console.log('User is signed out'))
  }
  
  function signOut ({navigation}) {
 

      return (
        <View style={{
          backgroundColor: '#000000',
          flex: 1,
          width: null,
          height: null,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            position: 'absolute',
            width: WIDTH*0.7,
            height: HEIGHT*0.33,
            backgroundColor: 'transparent',
            alignItems: 'center',
            borderRadius: 30,
            borderColor: '#F45D01',
            borderWidth: 7
          }}>
            <Text style={{
              flex:1,
              
              margin: 15,
              fontSize: 20,
              textAlignVertical: 'center',
              color: '#F45D01'
            }}> You want to Sign Out?

            </Text>
            <TouchableOpacity onPress={()=> {
              signOutFunc(),
              navigation.navigate('Landing')
            }} style={{
              width: 70,
              height: 35,
              borderRadius: 15,
              backgroundColor: '#FF9C33',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10

            }}>
              <Text style={{
                fontSize: 20
              }}>
                Yes
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      )
  }

  export default signOut