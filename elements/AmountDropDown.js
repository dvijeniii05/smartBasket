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
  
import { useCallback } from 'react';
  
  const db = firebase.firestore();
  const collectionRef = db.collection('rooms')

  const { width: WIDTH } = Dimensions.get('window');
  const { height: HEIGHT } = Dimensions.get('window');

  export default function AmountDropDown (props) {

        const {amount} = props

        const tempArray = amount.slice(0,3)

    return(
        

            <View style={{
                position: 'absolute',
                width: props.size,
                backgroundColor: 'black',
                top: 37,
                zIndex:2
            }}>
            {
             
                tempArray.map(item => {
                    
                    return(
                    <TouchableOpacity 
                    onPress = {() => 
                        {
                            props.onPress(),
                        props.changePicked(item)
                    }
                        
                    } 
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#121216',
                        marginVertical: 2,
                        paddingLeft: 20,
                        borderRadius: 5,
                        
                        
                    }}>
                    <Text style={{
                        color: 'white',
                        
                    }}>{item}</Text>
                    </TouchableOpacity>
                    )
                })

                

            }
            </View>
        
    )
  }