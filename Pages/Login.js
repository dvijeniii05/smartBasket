import React, { useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    ActivityIndicator
  
  } from 'react-native';

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
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true)
            }
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false)
            }
        )
            return () => {
                keyboardDidHideListener.remove()
                keyboardDidShowListener.remove()
            }
    }, [])

    const login = async() => {
        setLoading(true)
    await auth()
        .signInWithEmailAndPassword(nickname, password)
        .then(async(userCredentials)=>{
        const user = userCredentials.user
        const uid = user.uid
        await  AsyncStorage.setItem('uid', uid)
        console.log('User signed in!', uid)
        setLoading(false)
        navigation.navigate('Tabnavigator', {screen: 'Home'})
        } ) 
        .catch(error => {
            setLoading(false)
            if(error.code === 'auth/email-already-in-use') {
                alert('This email is in use')
            }
            if(error.code === 'auth/user-not-found') {
                alert('The email is not found')
            }
            if(error.code === 'auth/invalid-email') {
                alert('The email address is invalid!')
            }
            if(error.code === 'auth/wrong-password') {
                alert('Oops, password is incorrect')
            }
             else {console.log(error.code)}
        })
    }

        return (
            <View style={[styles.createBackGround, loading && {opacity: 0.7}]
            }>
            <StatusBar  backgroundColor='#000000'/>
            <View style={styles.loader}>
          <ActivityIndicator
          animating={loading}
          size="large"
          color="#EFF32B"
          />
          </View>
            {!isKeyboardVisible &&
            <Text style = {styles.enterOrCreateText}>Sign in</Text>
            }
            <View style={styles.registerStyle}>
                <TextInput
                    style={styles.textInputBox}
                    placeholder={'Username'}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'#ECEFFA'}
                    onChangeText={text =>  setNickname(text.toLowerCase())}
                    keyboardType='email-address'
                    />
                <TextInput
                style={styles.textInputBox}
                placeholder={'Password'}
                secureTextEntry
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setPassword(text)}
                />
                {!isKeyboardVisible &&
                <TouchableOpacity
                style={styles.registerButton}
                onPress={()=> {
                    login()
                    
                  }} >
                    <Text style={{textAlign: 'center', color: 'black', fontWeight: 'bold'}}>READY!</Text>
                </TouchableOpacity>
                }
                
            </View>
        </View>
        )
  }

  export default Login;