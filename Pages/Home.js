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
  import { useFocusEffect } from '@react-navigation/native'

  import {styles} from '../AllStyles'
import AsyncStorage from '@react-native-async-storage/async-storage';

  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
  
  

function Home ({navigation}) {
    const [card, setCard] =useState([
        {basketName:'Family Basket', previewItem: require('../Assets/images/bread.png'), numberOfItems: '21', updateTime: 'Last update : 20:00', key: '1'},
        {basketName:'My Basket', previewItem: require('../Assets/images/eggplant.png'), numberOfItems: '4', updateTime: 'Last update : 14:20', key: '2'},
        {basketName:'Presents', previewItem: require('../Assets/images/tomato.png'), numberOfItems: '12', updateTime: 'Last update : 16:50', key: '3'}
    ])

    
    const[basketNames, setBasketNames] = useState(null)
    const[temp, setTemp] = useState(null)
    const[ready, setReady] = useState(false)
    const[noBaskets, setNoBaskets] = useState(true)
    

    useFocusEffect(
        React.useCallback( () => {

            async function getBAskets() {

        const uid = await AsyncStorage.getItem('uid')
        

        const basketRef = db.collectionGroup('userList')
        const snapshot = await basketRef.where('id', '==', uid).get()

        try {
            
            if(!snapshot.empty) {
                const allBasketsNames = []
                snapshot.forEach( async doc => {

                    const basket = doc.data()
                    const bn = basket.basketName
                    allBasketsNames.push(bn)
                    
                       

                       setNoBaskets(false)

                })

                setBasketNames(allBasketsNames)
                
            } else {
                console.log('No Rooms for this user')
                
                setNoBaskets(true)
            }
        } catch(e) {
            console.log(e)
        } };

        getBAskets()

        }, [])
    )

    

    useEffect(async() => {

        if(basketNames === null) {
            alert('No baskets for this user')
        } else {
            
            async function createList(basket) {
                const getBasket = await collectionRef.doc(basket).get()
                try {
        
                    const rawData = getBasket.data()
                    
                    return rawData
                } catch (e) {
                    console.log(e)
                }
            }
            const newData = await Promise.all(basketNames.map(createList))
            setTemp(newData)
            
            
        }

        
    }, [basketNames])

    useEffect(() => {
        if(temp !== null) {
         
        setReady(true)
        
        }
    }, [temp])

    const detailsSet = async(room) => {


        await AsyncStorage.setItem('roomName', room)

        .then 
        navigation.navigate('Basket')
    }

    /* async function createList(basket) {
        const getBasket = await collectionRef.doc(basket).get()
        try {

            const rawData = getBasket.data()
            
            return rawData
        } catch (e) {
            console.log(e)
        }
    }
    const newData = await Promise.all(basketNames.map(createList))
    setTemp(newData)  */

    return (
        <View style={styles.homeBackGround}>
            <StatusBar  backgroundColor='#000000'/>
        {noBaskets && <TouchableOpacity
        style={styles.maybeBox}
        onPress={() => navigation.navigate('createBasket')}
        >
            <Text style={{
                textAlign: 'center',
                fontSize: 30,
                color: '#a2a4ac'

            }}>
                Create Basket
            </Text>

        </TouchableOpacity>

        }
        {ready && <FlatList
                data={temp}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.maybeBox} onPress={() => {
                        detailsSet(item.room)
                    }}>
                        <View style={styles.containerMaybe}>
                            <Text style={styles.basketName}> {item.room} </Text>
                            <Text style={styles.numberOfItems}>{item.items}</Text>
                            <Text style={styles.updateTime}>Updated: {item.time}</Text>
                        </View>
                    
                </TouchableOpacity>
         )}
         
         />}
         
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