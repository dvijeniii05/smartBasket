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

  import AsyncStorage from '@react-native-async-storage/async-storage'


  function Register ({navigation}) {
      
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
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
    

const register = async () => {
    setLoading(true)
    await auth()
    .createUserWithEmailAndPassword(nickname, password)
    .then(async (userCredentials)=> {
        const user = userCredentials.user
        const uid = user.uid
        await  AsyncStorage.setItem('uid', uid)

        firestore()
            .collection('users')
            .doc(uid)
            .set({
                userName: nickname,
                userPass: password,
                ID: uid
            })
.then(()=> {
    setLoading(false)
    console.log('User accoutn created and signed in!', user)
    navigation.navigate('Tabnavigator', { screen: 'Home' }) 
})
 })
    .catch(error => {
        setLoading(false)
        if(error.code === 'auth/email-already-in-use') {
            alert('This email is in use')
        }
        if(error.code === 'auth/invalid-email') {
            alert('The email address is invalid!')
        }
        if(error.code === 'auth/weak-password') {
            alert('Password should be at least 6 symbols')
        } else {console.log(error.code)}
    })
    
}
    return(
        
        <View style={[styles.createBackGround, loading && {opacity: 0.7}]}>
            <StatusBar  barStyle="light-content"/>
            <View style={styles.loader}>
          <ActivityIndicator
          animating={loading}
          size="large"
          color="#EFF32B"
          />
          </View>
            <Text style = {styles.enterOrCreateText}>Sign up</Text>
            <View style={styles.registerStyle}>
                <TextInput
                    style={styles.textInputBox}
                    placeholder={'Email'}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={'#ECEFFA'}
                    keyboardType='email-address'
                    onChangeText={text =>  setNickname(text.toLowerCase())}
                    
                    />
                <TextInput
                style={styles.textInputBox}
                placeholder={'Password'}
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setPassword(text)}
                
                />
                {!isKeyboardVisible &&
                <TouchableOpacity
                style={styles.registerButton}
                onPress={()=> {
                    register()
                    
                  }} >
                    <Text style={{textAlign: 'center', color: 'black', fontWeight: 'bold'}}>READY!</Text>
                </TouchableOpacity>
                }
                
            </View>
        </View>
    )
  }

  export default Register 