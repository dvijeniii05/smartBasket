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
    FlatList,
    Pressable,
    SectionList,
    LogBox,
    ActivityIndicator
  
  } from 'react-native';
  import SearchDropDown from './SearchDropDown'
  import AmountDropDown from './AmountDropDown'
  import {styles} from '../AllStyles'

  import Octicon from 'react-native-vector-icons/Octicons'
  import Icon from 'react-native-vector-icons/Entypo'
  import Maybe from 'react-native-vector-icons/Ionicons'

  import firestore from '@react-native-firebase/firestore'
  import firebase from '@react-native-firebase/app'
  
  
  
  

import { useCallback } from 'react';

  
  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
  const user = firebase.auth().currentUser
  const uid = user.uid
  
  
  
  

  const { width: WIDTH } = Dimensions.get('window');
  const { height: HEIGHT } = Dimensions.get('window');

const testDATA = [
      {
        name: 'coco',
        type: 'frvg',
        productPreview: require('../Assets/images/tomato.png')
        
      },
      {
        name: 'saus',
        type: 'mtmlk'
      },
      {
        name: 'mars',
        type: 'snch'
      }
    ]


  function Basket ({navigation}) {

    const [admin, setAdmin] = useState(false)

    const [frvg, setFrvg] = useState([])
    const [mtmlk, setMtmlk] = useState([])
    const [snch, setSnch] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(async() => {
      setLoading(true)

      const roomName = await AsyncStorage.getItem('roomName')
      
      const snapshot = await collectionRef.where('room', '==', roomName).get()
      try{
      if(!snapshot.empty) {
        
        const docCheck = snapshot.docs[0].data()

        if(docCheck.updated) {
          const data1 = docCheck.frvg
          const data2 = docCheck.mtmlk
          const data3 = docCheck.snch

          setFrvg(data1)
          setMtmlk(data2)
          setSnch(data3)
          setLoading(false)
          console.log(docCheck.mtmlk)
        }

        if (docCheck.creator === uid) {
          setAdmin(true)
          setLoading(false)
          console.log(admin)
        } else {
          setAdmin(false)
          setLoading(false)
        }
      
      } else {
        setLoading(false)
        alert('Something wrong')
      } 
    }
      catch {
        alert('Something wrong')
      }
      
      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  }, [])

   
    const [pickedProduct, setPickedProduct] = useState(null)
    const [coco, setCoco] = useState(null)
    const [filtered, setFiltered] = useState(coco)
    const [searching, setSearching] = useState(false)
    

    const [pickedAmount, setPickedAmount] = useState(null)
    const [amount] = useState(['1 litre', '2 litre', '3 kg', '5 bags'])
    const [amountFilt , setAmountFilt] = useState(amount)
    const [amountSearch, setAmountSearch] = useState(false)

    
    const DATA = [
      {productName: 'Tomato',
       amountOf: '3 kg', 
       productPreview: require('../Assets/images/tomato.png'), 
       key: '1', 
       completed: false,
       type: 'frvg'
       },

      {productName: 'Tomato', 
       amountOf: '4 kg', 
       productPreview: require('../Assets/images/tomato.png'), 
       key: '2',
       completed: false,
       type: 'mtml'
      },

      {productName: 'Tomato', 
       amountOf: '5 kg', 
       productPreview: require('../Assets/images/tomato.png'), 
       key: '3',
       completed: false,
       type: 'snch'
      },
    ]

    
    const [isRender, setIsRender] = useState(false)
    
    //** SEARCH FOR PRODUCTS AND AMOUNT */

    const onSearch = (text) => {
      if (text) {
         setSearching(true)
         const temp = text.toLowerCase()

         const firstList = testDATA.map(item =>  {
           
          return item.name
      }) 
      setCoco(firstList)
         const tempList = firstList.filter(item => {
           if(item.match(temp)) 
           return item
         })
          setFiltered(tempList)
          console.log(tempList)
      } else {
        setSearching(false)
        setFiltered(coco)
      }
    };

    const onAmount = (text) => {
      if(text) {
        setAmountSearch(true)
        const temp = text.toLowerCase()

        const tempList = amount.filter(item => {
          if(item.match(temp))
          return item
        })
          setAmountFilt(tempList)
          
      } else {
        setAmountSearch(false)
        setAmountFilt(amount)
      }
    };


    //* ADD PRODUCT BUTTON AND DELETE PRODUCT FROM LIST*/

    const addNewProduct = () => {
      if(pickedProduct !== null && pickedAmount !== null) {
        const typeSearch = testDATA.filter(obj => {
          return obj.name === pickedProduct
          
        })

        const finalType = typeSearch.map(item => {
          return item.type
        })
        console.log(finalType)

          const  stringtype = finalType.toString()
         

         console.log(stringtype)

          if(stringtype === 'frvg') {

      const newDATA = [...frvg, {productName: pickedProduct, amountOf: pickedAmount, productPreview: require('../Assets/images/tomato.png'), key: pickedProduct+pickedAmount, completed: false, productType: stringtype}]
      setFrvg(newDATA)
      console.log(newDATA)
    } 

    else if (stringtype === 'mtmlk') {
      
      const newDATA = [...mtmlk, {productName: pickedProduct, amountOf: pickedAmount, productPreview: require('../Assets/images/tomato.png'), key: pickedProduct+pickedAmount, completed: false, productType: stringtype}]
      setMtmlk(newDATA)
    } 
    else if (stringtype === 'snch') {

      const newDATA = [...snch, {productName: pickedProduct, amountOf: pickedAmount, productPreview: require('../Assets/images/tomato.png'), key: pickedProduct+pickedAmount, completed: false, productType: stringtype}]
      setSnch(newDATA)
    }
    
    } else {
         
        alert('Please pick product and amount')
      }
    }

    const deleteProduct = (id, type) => {
      
      if(admin) {
      const stringType = type.toString() 
      if(stringType === 'frvg') {
      const afterDeleting = frvg.filter(item => item.key !== id)
      setFrvg(afterDeleting)
      } 
      else if (stringType === 'mtmlk') {
        const afterDeleting = mtmlk.filter(item => item.key !== id)
      setMtmlk(afterDeleting)
      } 
      else if (stringType === 'snch') {
        const afterDeleting = snch.filter(item => item.key !== id)
      setSnch(afterDeleting)
      }} else {
        alert('You cannot delete products in this basket')
      }
    }
    


    //* CHECKBOX PART */
    const triggerSelect = (id, type) => {
      
      const stringType = type.toString()
      if(stringType === 'frvg') {
      setFrvg(prev => 
        prev.map(
        item => item.key === id
        ? {...item, completed: !item.completed}
        : item
      ))
        } else if (stringType === 'mtmlk') {
          setMtmlk(prev => 
            prev.map(
            item => item.key === id
            ? {...item, completed: !item.completed}
            : item
          ))
        } else if (stringType === 'snch') {
          setSnch(prev => 
            prev.map(
            item => item.key === id
            ? {...item, completed: !item.completed}
            : item
          )) }
    
    }
    
    const CheckBox =({id, triggerSelect, completed, type})=> {

        const onPress = () => {
          triggerSelect(id, type)
          console.log(id)
        };

        return (
          <Pressable
          onPress={onPress}
          style={[styles.checkBox,
          completed && {backgroundColor: '#EFF32B'}]}
          >
            {completed && <Octicon name="check" size={18} color='black' style={{position: 'absolute'}}/>}
          </Pressable>
        )
      }


  //* SEPARATOR FOR FLATLIST*/

  const separatorUnit = () => {
    return(
      <View
      style={{
        height:1,
        
        backgroundColor: '#efeef2',
        marginHorizontal:  0.085*WIDTH,
        marginBottom: 10
      }}
      
      />
    )
  }

  //* UPDATE BUTTON TO SAVE DATA TO FIRESTORE */

  const saveData = async () => {
setLoading(true)

setTimeout(() => {
  setLoading(false)
}, 800);
const roomName = await AsyncStorage.getItem('roomName')

    firestore()
    .collection('baskets')
    .doc(roomName)
    .set({
      frvg: frvg,
      mtmlk: mtmlk,
      snch: snch,
      updated: true,
      items: frvg.length + mtmlk.length + snch.length,
    }, {merge: true})
    
  }
  



    return (
        <View style={[styles.backgroundBasket,
        loading && {opacity: 0.7}]}>
          <StatusBar  backgroundColor='#1b1b22'/>
          <View style={styles.loader}>
          <ActivityIndicator
          animating={loading}
          size="large"
          color="#EFF32B"
          />
          </View>
          <ScrollView 
          nestedScrollEnabled={true} 
          style={{flex: 1, width: WIDTH}}>
          
          <View style={{alignItems: 'center',}}>
          <Text style={{
            fontSize:30,
            color:'white',
          }}>Basket Name</Text>
            <Image style={{
              width: 0.8*WIDTH,
              height: 110,
              marginTop: 22,
            }}source={require('../Assets/images/maybe.gif')} />
            </View>
          <View style={{
              marginTop: 19,
              marginLeft: 0.1*WIDTH,
              flexDirection: 'row',
              alignItems: 'center',
              
              
              }}>
            <View style={{
                  height:29
                }}>
                <TextInput
                placeholder={'Product Search'}
                style={styles.productSearch}
                placeholderTextColor={'#a2a4ac'}
                onChangeText={onSearch}
                value={pickedProduct}
                />
                { searching &&
                <SearchDropDown
                onPress={() => 
                  setSearching(false)}
                data={filtered}
                changePicked={product => setPickedProduct(product)}
                />
                }
            </View>

                <TouchableOpacity 
                onPress={()=>
                  setPickedProduct(null)
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 5
                
                }}>
                  <Icon name="circle-with-cross" size={20} color='#E0E0E0'/>
                </TouchableOpacity>

            <View style={{
                  height:29,
                  paddingLeft: 20
                }}>
                  <TextInput
                  placeholder={'Amount'}
                  style={styles.amountSearch}
                  placeholderTextColor={'#a2a4ac'}
                  onChangeText={onAmount}
                  value={pickedAmount}/>
                  { amountSearch &&
                  <AmountDropDown
                  onPress={() => 
                    setAmountSearch(false)}
                  amount={amountFilt}
                  changePicked={amount => setPickedAmount(amount)}
                  />
                } 
            </View>
                
                <TouchableOpacity 
                onPress={()=>
                  setPickedAmount(null)
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 5
                }}>
                  <Icon name="circle-with-cross" size={20} color='#E0E0E0'/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButton} onPress={addNewProduct}>
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
                
            </View>
            <View style={{
              alignItems: 'center',
              marginTop: 30
            }}>
              
            </View>
            <View style={{
              marginTop: 21
            }}>
              <SectionList 
               sections={[
                {title: 'Fuit & Veg', data: frvg},
                {title: 'Meat & Milk', data: mtmlk},
                {title: 'Snacks & Chocolate', data: snch}
               ]}
               renderSectionHeader={({section}) => (
                 <Text style={{
                  fontSize: 20,
                  color: 'white',
                  fontFamily: 'Righteous-Regular',
                  textAlign: 'center',
                  marginBottom: 10
                 }}>{section.title}</Text>
    )}          
               keyExtractor={(item) => item.key.toString()}
               extraData={isRender}
               nestedScrollEnabled={true}
               
               ItemSeparatorComponent={separatorUnit}
               renderItem={({item, index}) => (
                  <View style={{
                    flexDirection: 'row',
                    marginHorizontal: 0.125*WIDTH,
                    marginBottom: 10,
                    alignItems: 'center'
                    
                  }}> 
                    <Image source={item.productPreview} style={{height: 20,
                    width: 20,}} />
                    <Text style={[styles.productList, {
                      marginLeft: 30, width: 50
                    }]} >{item.productName}</Text>
                    <Text style={[styles.productList, {
                      marginLeft: 50,  width: 50
                    }]}>{item.amountOf}</Text>
                    
                    
                    <CheckBox
                      
                      id={item.key}
                      type={item.productType}
                      completed={item.completed}
                      triggerSelect={triggerSelect}
                      />

                    <TouchableOpacity 
                    onPress={() => deleteProduct(item.key, item.productType)}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: 20
                }}>
                  
                  <Icon name="circle-with-cross" size={20} color='#E0E0E0'/>
                      
                    </TouchableOpacity>
                  </View>


               )}
              />
              
            </View>
            </ScrollView>
            <TouchableOpacity 
            style={styles.updateButton}
            onPress={saveData}>
                
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Confirm</Text>
                
              </TouchableOpacity>
        </View>
    )
  }

  export default Basket;