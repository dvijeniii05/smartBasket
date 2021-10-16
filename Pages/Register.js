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


  function Register ({navigation}) {
      
    const [nickname, setNickname] = useState('no');
    const [password, setPassword] = useState('no');

const userRegister = async () => {
    auth()
    .signInAnonymously()

    .then(() =>
    firebase.auth().onAuthStateChanged(async (user)=> {
        if (user) {
            const uid = user.uid;
            await AsyncStorage.setItem('uid', uid)
            

            .then

            firestore()
            .collection('users')
            .doc(uid)
            .set({
                userName: nickname,
                userPass: password
            })

            await AsyncStorage.setItem('authState', JSON.stringify(true))
            const maybe = await AsyncStorage.getItem('uid')
            console.log(maybe)
            
        } else {
            // User is signed out!
        }

    })
    ) 
    .catch(error => {
        
        console.error(error);
      })
}

const nickCheckAndSave = async () => {
    if (nickname === 'no' || password === 'no') {
            alert('Please enter your details!')
    } else {
        try{
            await AsyncStorage.setItem('nickname', JSON.stringify(nickname))

            const maybeNick = await AsyncStorage.getItem('nickname')
            const parseNick = JSON.parse(maybeNick)
            
            console.log(parseNick)

            navigation.navigate('Tabnavigator', { screen: 'Home' })
        } catch (e) {
            console.log(e)
            alert('Something is wrong!@')
        }
    }
}

    return(
        
        <View style={styles.createBackGround}>
            <StatusBar  backgroundColor='#000000'/>
            <View style={styles.registerStyle}>
                <TextInput
                    style={styles.textInputBox}
                    placeholder={'Username'}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'#ECEFFA'}
                    onChangeText={text =>  setNickname(text)}
                    
                    />
                <TextInput
                style={styles.textInputBox}
                placeholder={'Password'}
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setPassword(text)}
                
                />
                <TouchableOpacity
                style={styles.registerButton}
                onPress={()=> {
                    nickCheckAndSave()
                    userRegister()
                    
                  }} >
                    <Text style={{textAlign: 'center', color: 'black', fontWeight: 'bold'}}>READY!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }

  export default Register 