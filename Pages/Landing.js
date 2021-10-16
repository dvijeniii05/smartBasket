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
  
  } from 'react-native';

  import {styles} from '../AllStyles'
  

  function Landing ({navigation}) {
      return (
          <View style={styles.homeBackGround}>
              <StatusBar  backgroundColor='#000000'/>
              <View style={styles.landingPage}>
                <Image style={styles.logoMaybe}
                source={require('../Assets/Logo/maybe.png')}/>
                <Text style={styles.logoText}>.smartBasket</Text>
                <View style={styles.landingMargin}>
              <TouchableOpacity
              style={styles.landingButtons}
              
              onPress={() => navigation.navigate('Register')}
              > 
              <Text style={{textAlign: 'center', color: 'black', fontWeight: 'bold'}}>Sing Up</Text> 
              </TouchableOpacity>
              <TouchableOpacity
              
              style={styles.landingButtons}
              onPress={() => navigation.navigate('Login')}
              >
            <Text style={{textAlign: 'center',color: 'black', fontWeight: 'bold'}}>Log In</Text>
            </TouchableOpacity>
            </View>
              </View>
          </View>
      )
  }

  export default Landing;