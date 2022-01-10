import React, { useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    BackHandler,
    SafeAreaView
  } from 'react-native';
  import firestore from '@react-native-firebase/firestore'
  import firebase from '@react-native-firebase/app'
  import { useFocusEffect } from '@react-navigation/native'

  import images from '../Assets/images/index';
  import ModalPopup from '../elements/ModaPopUp';
  import OnboardingScreen from './OnboardingScreen'

  import {styles} from '../AllStyles'
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { scaledHeight, scaledWidth } from '../elements/sizeScale';

  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
  
  

function Home ({navigation}) {
    
    const[basketNames, setBasketNames] = useState(null)
    const[temp, setTemp] = useState(null)
    const[ready, setReady] = useState(false)
    const[noBaskets, setNoBaskets] = useState(true)
    const[firstTime, setFirstTime] = useState(false)
    

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

        async function firstTimeHere() {
            const first = await AsyncStorage.getItem('firstTimeHome')
            const parsedFirst = JSON.parse(first)
    
            if(parsedFirst === null) {
              console.log('Tut?', parsedFirst)
              setFirstTime(true)
              console.log(firstTime)
            } else {
              console.log('zdes', firstTime, parsedFirst)
              setFirstTime(false)}
          }

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
        firstTimeHere()
        
    }, [basketNames])

    useEffect(() => {
        if(temp !== null) {
         
        setReady(true)
        
        }
    }, [temp])

    useEffect(()=> {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    const detailsSet = async(room) => {
        await AsyncStorage.setItem('roomName', room)

        .then 
        navigation.navigate('Basket')
    }

    async function firstFunc(){
        console.log('Bred!')
       await AsyncStorage.setItem('firstTimeHome', JSON.stringify(false))
       setFirstTime(false)
      }

    const imageSelect = () => {

        const tempArray = images
        const arr = []
        for(const key in tempArray){
            arr.push(key)
           }
        const ranNumb = Math.floor(Math.random()*264)
        const randName = arr[ranNumb]
        console.log(randName)
        return images[`${randName}`]
       
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
                <View style={{ width: '28%'}}>
                    <Image source={imageSelect()} resizeMode='contain' style={{height: '100%',
                        width:'100%', }}/>
                </View>
                <View style={styles.containerMaybe}>
                    <Text style={styles.basketName}> {trim()} </Text>
                    <Text style={styles.numberOfItems}>{item.items}</Text>
                    <Text style={styles.updateTime}>Updated: {item.time}</Text>
                </View>
            
        </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.homeBackGround}>
            <StatusBar barStyle="light-content" />
            <View style={{backgroundColor:'transparent', alignItems:'flex-end'}}>
            <TouchableOpacity onPress={()=> navigation.navigate('helpScreen')} style={{
             backgroundColor:'transparent', 
             height: scaledHeight('5%'), 
             width: scaledWidth('28%'),
             marginTop: scaledHeight('2%'),
             borderRadius:10,
             alignItems:'center',
             justifyContent:'center'}}>
            <Text style={{color:'#FF9C33', fontWeight:'600', fontSize:scaledHeight('1.9%')}}>Need Help?</Text>
         </TouchableOpacity>
         </View>
         {firstTime && <ModalPopup visible={firstTime} heightParam='50%'>
            
            <View style={{
              flex:1,
              alignItems:'center',
              borderRadius: 15,
              borderWidth:5,
              }}>
                <View style={{flex:1, justifyContent:'center'}}>
            <Text style={{color: 'white', fontSize:18}}>Well, you are here!</Text>
                </View>
                <View style={{flex:2, justifyContent:'center',}}>
            <Text style={{color:'white', textAlign: 'center', fontSize:16}}>If you wish to create a new basket press the "Create Basket" button or tap the <Text style={{color:'#F45D01'}}>"+"</Text> sign to create. If you wish to login an existing basket, please tap the <Text style={{color:'#F45D01'}}>"+"</Text> sign and <Text style={{color:'#F45D01'}}>".enter"</Text> button after it. </Text>
                </View>
                <View style={{flex:1, justifyContent:'center'}}>
                  <TouchableOpacity onPressIn={()=> firstFunc()} style={[styles.confirmButton, {backgroundColor:'#45B649'}]}>
                    <Text style={{color:'black'}}>Okay</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </ModalPopup>}   
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
         
         
        </SafeAreaView>
    )
}
export default Home;