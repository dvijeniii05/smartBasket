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

  import pickerArray from '../elements/picker';
  import randomPick from '../elements/randomPick'

  import {styles} from '../AllStyles'
import AsyncStorage from '@react-native-async-storage/async-storage';

  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
  
  

function Home ({navigation}) {
    
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
                setBasketNames(null)
                setNoBaskets(true)
            }
        } catch(e) {
            console.log(e)
        } };

        getBAskets()

        }, [])
    )

    

    useEffect(() => {

        async function fetchData() {
            if(basketNames === null) {
            console.log('loading baskets')
            
            setTemp(null)
        } else {
            
            async function createList(basket) {
                const getBasket = await collectionRef.doc(basket).get()
                try {
        
                    const rawData = getBasket.data()
                    console.log(temp)
                    return rawData
                } catch (e) {
                    console.log(e)
                }
            }
            const newData = await Promise.all(basketNames.map(createList))
            
            setTemp(newData)
        }
    }
        fetchData()

        
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

    const imageSelect = () => {

        const tempArray = pickerArray
        
        const ranNumb = randomPick[Math.floor(Math.random()*randomPick.length)]

        return tempArray[ranNumb]
       
       
      
    }


    const renderEachItem = (item) => {

        function trim () {
            if(item.room.length <= 10) {
                return item.room
              } else {
                return item.room.slice(0,10) + ".."
              }
        }

        return (
            <TouchableOpacity style={styles.maybeBox} onPress={() => {
                detailsSet(item.room)
            }}>
                <View style={{ width: 100, left: 20}}>
                <Image source={imageSelect()} resizeMode='contain' style={{height: 80,
            width:80, }}/>
            </View>
                <View style={styles.containerMaybe}>
                    <Text style={styles.basketName}> {trim()} </Text>
                    <Text style={styles.numberOfItems}>{item.items}</Text>
                    <Text style={styles.updateTime}>Updated: {item.time}</Text>
                </View>
            
        </TouchableOpacity>
        )
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
        style={[styles.maybeBox, {justifyContent:'center', alignItems: 'center'}]}
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
                renderItem={({item}) => renderEachItem(item)}
         
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