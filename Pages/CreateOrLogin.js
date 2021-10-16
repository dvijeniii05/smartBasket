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

  const { width: WIDTH } = Dimensions.get('window');
  const { height: HEIGHT } = Dimensions.get('window');

  function Choice ({navigation}) {
      return (

        <View style={styles.mainContainer}>
            
            <TouchableOpacity
            onPress={() => navigation.navigate('createBasket')}
            style={styles.pickButtons}>
                <Text style={styles.pickText}>.create</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => navigation.navigate('loginBasket')}
            style={styles.pickButtons}>
                <Text style={styles.pickText}>.enter</Text>
            </TouchableOpacity>
            
        </View>
      )
  }

  export default Choice;