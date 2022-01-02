import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard
  
  } from 'react-native';

  import {styles} from '../AllStyles'

  import firestore from '@react-native-firebase/firestore'
  import firebase from '@react-native-firebase/app'
  import auth from '@react-native-firebase/auth';
  
  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
  const user = firebase.auth().currentUser
  
function basketLogin ({navigation}) {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

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
    

    const [roomName, setRoomName] = useState('');
    const [roomPass, setRoomPass] = useState('');
    
const detailsCheck = async() => {
    const snapshot = await collectionRef.where('room', '==', roomName).get()
    const uid = await AsyncStorage.getItem('uid')
    
    console.log(roomName)
    
    if (snapshot.empty) {
        alert('Basket with entered details doesnt exist')
    } else {
        try {
            await AsyncStorage.setItem('roomName', roomName)
            
                const docCheck = snapshot.docs[0].data()
    
                if (docCheck.password === roomPass) {
                    
                    await roomUpdate(uid)
                    await userUpdate(uid)

                    .then
                    navigation.navigate('Basket')
    
                } else {
                    alert('Password is incorrect')
                }
            
        } catch {
            alert('something is wrong')
        }
    }
}
const roomUpdate = async(uid) => {
    firestore()
    .collection('baskets')
    .doc(roomName)
    .collection('userList')
    .doc(uid)
    .set({
        id: uid,
        basketName: roomName
    })
}

const userUpdate = async (uid) => {
    firestore()
    .collection('users')
    .doc(uid)
    .collection('baskets')
    .doc(roomName)
    .set({
        basketName: roomName
    })
}
  
    return (
        <View style={styles.createBackGround}>
            <View style={styles.createBasket}>
            {!isKeyboardVisible &&
            <Text style = {styles.enterOrCreateText}>.enterBasket</Text>
            }
                <View style={styles.registerStyle}>
                <TextInput
                style={styles.textInputBox}
                placeholder={'Basket name'}
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setRoomName(text)}
                autoCapitalize='none'
                />
                <TextInput
                style={styles.textInputBox}
                placeholder={'Password'}
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setRoomPass(text)}
                />
                </View>
                {!isKeyboardVisible && 
                <TouchableOpacity 
                style ={styles.registerButton}
                onPress={() => {
                    detailsCheck()
                    
                }}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Enter</Text>
                </TouchableOpacity>
                }
                
            </View>
        </View>
    )
}
export default basketLogin;