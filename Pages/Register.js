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
  import { useFocusEffect } from '@react-navigation/native'

  import AsyncStorage from '@react-native-async-storage/async-storage'


  function Register ({navigation}) {
      
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    

const register = async () => {
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
    console.log('User accoutn created and signed in!', user)
    navigation.navigate('Tabnavigator', { screen: 'Home' }) 
})
 })
    .catch(error => {
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

 /* const userRegister = async () => {
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
                userPass: password,
                ID: uid
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
} */

/* const nickCheckAndSave = async () => {
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
} */

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
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setPassword(text)}
                
                />
                <TouchableOpacity
                style={styles.registerButton}
                onPress={()=>register()} >
                    <Text style={{textAlign: 'center', color: 'black', fontWeight: 'bold'}}>READY!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }

  export default Register 