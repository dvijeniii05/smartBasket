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

  function Login ({navigation}) {

    const [nickname, setNickname] = useState(null);
    const [password, setPassword] = useState(null)

    const login = async() => {
    await auth()
        .signInWithEmailAndPassword(nickname, password)
        .then(async(userCredentials)=>{
        const user = userCredentials.user
        const uid = user.uid
        await  AsyncStorage.setItem('uid', uid)
        console.log('User signed in!', uid)
        navigation.navigate('Tabnavigator', {screen: 'Home'})
        } ) 
        .catch(error => {
            if(error.code === 'auth/email-already-in-use') {
                alert('This email is in use')
            }
            if(error.code === 'auth/invalid-email') {
                alert('The email address is invalid!')
            }
             else {console.log(error.code)}
        })
    }

    const detailsCheck = async() => {

        if(nickname != null && password != null) {

        const snapshot = await collectionRef.where('userName', '==', nickname).get()
        auth()
        .signInAnonymously()
        

        .then
        if (snapshot.empty) {
            alert('User doesnt exist')
        } else {
            try {

                const docCheck = snapshot.docs[0].data()

                    if(docCheck.userPass === password) {

                        navigation.navigate('Tabnavigator', {screen: 'Home'})

                    } else {
                        alert('Incorrect password')
                    }
            } catch {
                alert('something else is wrong')
            }
        }

    } else {alert('Please input Nickname and Password')}

    }
        return (
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
                secureTextEntry
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setPassword(text)}
                
                />
                <TouchableOpacity
                style={styles.registerButton}
                onPress={()=> {
                    login()
                    
                  }} >
                    <Text style={{textAlign: 'center', color: 'black', fontWeight: 'bold'}}>READY!</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
  }

  export default Login;