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
    FlatList,
    SafeAreaView,
  
  } from 'react-native';

  import firestore from '@react-native-firebase/firestore'
  import firebase from '@react-native-firebase/app'
  import auth from '@react-native-firebase/auth'

  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
  const user = firebase.auth().currentUser
  const uid = user.uid
   
  
  import {styles} from '../AllStyles'


function Home () {
    const [card, setCard] =useState([
        {basketName:'Family Basket', previewItem: require('../Assets/images/bread.png'), numberOfItems: '21', updateTime: 'Last update : 20:00', key: '1'},
        {basketName:'My Basket', previewItem: require('../Assets/images/eggplant.png'), numberOfItems: '4', updateTime: 'Last update : 14:20', key: '2'},
        {basketName:'Presents', previewItem: require('../Assets/images/tomato.png'), numberOfItems: '12', updateTime: 'Last update : 16:50', key: '3'}
    ])

    const[maybe, setMaybe] = useState(null);

    useEffect(async() => {
        const userRef = db.collection('users').doc(uid).collection('baskets')
        const basketRef = db.collectionGroup('userList')
        const snapshot = await basketRef.where('id', '==', uid).get()

        try {
            
            if(!snapshot.empty) {
                const baskets = []
                snapshot.forEach(element => {
                    const basketName = element.data()
                    
                    baskets.push(basketName.basketName)
                    console.log(baskets)
                })
                
            } else {console.log('No Rooms for this user')}
        } catch(e) {
            console.log(e)
        }
    })
    return (
        <View style={styles.homeBackGround}>
            <StatusBar  backgroundColor='#121518'/>

         <FlatList
         data={card}
         renderItem={({item}) => (
            <View style={styles.maybeBox}>
                <View style={styles.containerMaybe}>
                    <Text style={styles.basketName}> {item.mainText} </Text>
                    <Text style={styles.numberOfItems}>{item.numberOfItems}</Text>
                    <Text style={styles.updateTime}> {item.updateTime}</Text>
                </View>
                <Image source= {item.previewItem} style={styles.previewItem}/>
            </View>
         )}
         
         />
            {/* <View style={styles.maybeBox}>
            <Text style={styles.mainText}> Family Basket </Text>
            <Image source={cardOneItem} style={styles.previewItem}/>
            <Text style={styles.numberOfItems}>21</Text>
           {/*<Text style={styles.wordItems}>items</Text>  
           <Text style={styles.updateTime}> Last update : 20:00</Text> 
               
            </View> */} 
        </View>
    )
}
export default Home;