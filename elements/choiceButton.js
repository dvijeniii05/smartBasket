import React from 'react'
import {
    StyleSheet,
    View,
    Button,
    Image,
    Text,
    TouchableOpacity,
    Animated,
    TouchableHighlight
    
  } from 'react-native';
  import {styles} from '../AllStyles'
  import Octicon from 'react-native-vector-icons/Octicons'

import { useState, useMemo } from 'react';

const AnimatedIcon = Animated.createAnimatedComponent(Octicon)

  function ChoiceButton ({navigation, onPress}) {
      
   const mode = useMemo(() => new Animated.Value(0), [])

   const [pressed, setPressed] = useState(false)

   const changeWidth = () => {

    setPressed(!pressed)
   }

   const handlePress = () => {
       
        Animated.timing(mode, {
            duration: 500,
            toValue: mode._value === 0 ? 1 : 0,
            useNativeDriver: false
        }).start()
    }

    const rotation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"]

    })

    const createX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -90]
    })

    const createY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0]
    })

    const loginX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 90]
    })

    const loginY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0]
    })

    const comOpacity = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0.1, 1]
    })

    const colorChange = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(162,164,172)', 'rgb(255,156,51)']
    })


    return (
        <View style={[styles.choiceSecBox, pressed && {width: 240}]}>

            <View>
                <Animated.View style={{ left: createX, top: createY,  opacity: comOpacity}} >
                <TouchableHighlight onPress={() => navigation.navigate('createBasket')}>
                    <View style ={styles.popUpButton}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>.create</Text>
                    </View>
                </TouchableHighlight>
                </Animated.View>
                <Animated.View style={{position: 'absolute', left: loginX, top: loginY, opacity: comOpacity}}>
                <TouchableHighlight onPress={() => navigation.navigate('loginBasket')}>
                    <View style ={styles.popUpButton}>
                        <Text style={{textAlign:'center', fontWeight: 'bold'}}>.enter</Text>
                    </View>
                </TouchableHighlight>
                </Animated.View>

                </View>
                <Animated.View style={styles.choiceButton}> 
                <TouchableOpacity onPress={() => {
                    onPress()
                    handlePress()
                    changeWidth()
                    
                }} >
                    <Animated.View style={{transform: [{ rotate: rotation}] }}>
                    <AnimatedIcon name={'plus'} size={32} style={{color: colorChange}}/>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
             
            
        </View>
    )

  }

  export default ChoiceButton;