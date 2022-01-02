import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
  } from 'react-native';

  import firestore from '@react-native-firebase/firestore'
  import firebase from '@react-native-firebase/app'
  import {scaledWidth, scaledHeight} from '../elements/sizeScale'
import { styles } from '../AllStyles';

  const db = firebase.firestore();

  export default function SearchDropDown (props) {
        const [noResults, setNoResults] = useState(false)
        const {data} = props
        const tempArray = data.slice(0,10)


        function renderItem (item) {
            return(
            <TouchableOpacity 
                    onPress = {() => 
                        {props.onPress(),
                        props.changePicked(item)}
                    } 
                    style={styles.searchEachItem}>
                    <Text style={{
                        color: 'white',
                        fontSize: 15
                    }}>{item}</Text>
            </TouchableOpacity>
            )}

    return(
        
            <View style={[styles.searchDropDown, {width: props.size,}, tempArray.length? {height: scaledHeight('17%')}: {height:0}]}>
                <FlatList
                data={tempArray}
                renderItem={({item}) => renderItem(item)}
                showsVerticalScrollIndicator={true} />
            
            </View>
            
        
    )
  }
