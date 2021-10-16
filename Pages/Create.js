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
import { useFocusEffect } from '@react-navigation/native';
  
  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
 
  


function Create ({navigation}) {

    const [roomName, setRoomName] = useState('');
    const [roomPass, setRoomPass] = useState('');
    const [uid, setUid] = useState(null)

    useFocusEffect(
        React.useCallback(() => {
            async function settingUid() {
                const getUid = await AsyncStorage.getItem('uid')

                setUid(getUid)
            }

            settingUid()
        }, [])
    )
    
   

    const detailsCheck = async () => {
        
        
        const snapshot = await collectionRef.where('room', '==', roomName).get()
        if(snapshot.empty) {
        if(roomName === '' || roomPass === '') {
            alert('Enter all details!')
        } else {
            try { 
                    await AsyncStorage.setItem('roomName', roomName)
                    
                    

                await roomGen()
                
                await userUpdate()

                  .then 
            navigation.navigate('Basket')
            } catch(e) {
                    console.log(e)
            }
        }
    } else {
        alert('This basket name is taken')
    }
    }
    const roomGen = async () => {
        firestore()
        .collection('baskets')
        .doc(roomName)
        .set({
            room: roomName,
            password: roomPass,
            creator: uid,
            
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
    return (
        <View style={styles.createBackGround}>
            <View style={styles.createBasket}>
                <Text style = {styles.enterOrCreateText}>.createBasket</Text>
                <View style={styles.registerStyle}>
                
    
                <TextInput
                style={styles.textInputBox}
                placeholder={'Basket name'}
                underlineColorAndroid='transparent'
                placeholderTextColor={'#ECEFFA'}
                onChangeText={text =>  setRoomName(text)}
                />
                
                <TextInput
                style={styles.textInputBox}
                placeholder={'Password'}
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
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>CREATE!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Create;