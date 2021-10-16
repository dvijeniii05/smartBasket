import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

export default function ModalPopup ({visible, children}) {

    const [showModal, setShowModal] = useState(visible)

    const scaleValue = React.useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if(visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            setTimeout(() => setShowModal(false), 200)
            Animated.timing(scaleValue, {
                toValue:0,
                duration: 300,
                useNativeDriver: true
            }).start()
        }
    };

    return(
        <Modal transparent visible={showModal}>
            <View style= {{
                flex: 1,
                backgroundColor: 'transparent',
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Animated.View style={[{
                    width: '60%',
                    height: '40%',
                    backgroundColor: 'black',
                    borderWidth:5,
                    
                    elevation: 20,
                }, {transform: [{scale: scaleValue}]}]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    )



}