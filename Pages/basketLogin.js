import AsyncStorage from '@react-native-async-storage/async-storage';

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

  import {styles} from '../AllStyles'

  import firestore from '@react-native-firebase/firestore'
  import firebase from '@react-native-firebase/app'
  import auth from '@react-native-firebase/auth';
  
  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
  const user = firebase.auth().currentUser
  const uid = user.uid


function basketLogin ({navigation}) {

    const [roomName, setRoomName] = useState('');
    const [roomPass, setRoomPass] = useState('');

    
const detailsCheck = async() => {
    const snapshot = await collectionRef.where('room', '==', roomName).get()
    
    console.log(roomName)
    
    if (snapshot.empty) {
        alert('Basket with entered details doesnt exist')
    } else {
        try {
            await AsyncStorage.setItem('roomName', roomName)
                const docCheck = snapshot.docs[0].data()
    
                if (docCheck.password === roomPass) {
                    
                    await roomUpdate()
                    await userUpdate()

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

const roomUpdate = async() => {
    firestore()
    .collection('baskets')
    .doc(roomName)
    .collection('userList')
    .doc(uid)
    .set({
        user: roomName,
        id: uid,
        basketName: roomName

    })
    
}

const userUpdate = async () => {
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
                <View style={{flexDirection: 'row',alignItems: 'center',}}>
                <Text style={{
                    color: 'white',
                }}>
                    Basket Name:
                </Text>
    
                <TextInput
                style={styles.roomCreationInputBox}
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setRoomName(text)}
                />
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Text style={{
                    color: 'white',
                }}>
                    Password:
                </Text>
    
                <TextInput
                style={styles.roomCreationInputBox}
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setRoomPass(text)}
                />
                </View>
                <TouchableOpacity 
                style ={styles.registerButton}
                onPress={() => {
                    detailsCheck()
                    
                }}>
                    <Text style={{textAlign: 'center'}}>Enter</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default basketLogin;