import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  Animated,
} from 'react-native';

export default function ModalPopup ({visible, children, heightParam}) {

    const [showModal, setShowModal] = useState(visible)

    const scaleValue = React.useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if(visible) {
            setShowModal(true);
            
        } else {
            setShowModal(false)
        }
    };
    
    return(
        <Modal transparent visible={showModal} hardwareAccelerated={true}>
            <View style= {{
                flex: 1,
                backgroundColor: 'transparent',
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    width: '60%',
                    height: heightParam,
                    backgroundColor: 'black',
                    borderWidth:5,
                    borderRadius: 25
                }}>
                    {children}
                </View>
            </View>
        </Modal>
    )



}