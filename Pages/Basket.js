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
    ActivityIndicator,
    Modal
  
  } from 'react-native';
  import SearchDropDown from '../elements/SearchDropDown'
  import AmountDropDown from '../elements/AmountDropDown'
  import {styles} from '../AllStyles'
  

  import Octicon from 'react-native-vector-icons/Octicons'
  import Icon from 'react-native-vector-icons/Entypo'
  

  import firestore from '@react-native-firebase/firestore'
  import firebase from '@react-native-firebase/app'
  
  import format from 'date-fns/format'

  import productData from '../elements/productData'
  import images from '../Assets/images/products/index'
  import pickerArray from '../elements/picker';
  import ModalPopup from '../elements/ModaPopUp';
  
  

import { useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/core';
import { color } from 'react-native-reanimated';

  
  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
  const user = firebase.auth().currentUser

  

  const { width: WIDTH } = Dimensions.get('window');
  const { height: HEIGHT } = Dimensions.get('window');


  function Basket ({navigation}) {

    const [admin, setAdmin] = useState(false)

    const [frvg, setFrvg] = useState([])
    const [mtmlk, setMtmlk] = useState([])
    const [snch, setSnch] = useState([])
    const [loading, setLoading] = useState(true)

    const [basketName, setBasketName] = useState(null)

    const [visible, setVisible] = useState(false)

    

    useEffect(async() => {
      setLoading(true)

      const roomName = await AsyncStorage.getItem('roomName')

      setBasketName(roomName)

      const snapshot = await collectionRef.where('room', '==', roomName).get()
      try{
      if(!snapshot.empty) {
        const uid = await AsyncStorage.getItem('uid')
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
    const [productNames, setProductNames] = useState(null)
    const [filtered, setFiltered] = useState(productNames)
    const [searching, setSearching] = useState(false)
    

    const [pickedAmount, setPickedAmount] = useState(null)
    const [amount] = useState(['1 litre', '2 litre', '3 kg', '5 bags'])
    const [amountFilt , setAmountFilt] = useState(amount)
    const [amountSearch, setAmountSearch] = useState(false)

    const [specs, setSpecs] = useState(null)

    

    const [iconLink, setIconLink] = useState(null)

    const [isRender, setIsRender] = useState(false)

    const [searchWidth, setSearchWidth] = useState(null)

    const imageSelect = picker => {

      const tempArray = pickerArray

      return tempArray[picker]
    }
    
    //** SEARCH FOR PRODUCTS AND AMOUNT */

    const onSearch = (text) => {
      if (text) {
         setSearching(true)
         const temp = text.toLowerCase()

         const tempProductNames = productData.map(item =>  {
           
          return item.name
      }) 
      setProductNames(tempProductNames)
         const tempList = tempProductNames.filter(item => {
           if(item.match(temp)) 
           return item
         
         })
          setFiltered(tempList)
          console.log(tempList)

       } else {
          setSearching(false)
          setFiltered(productNames)
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

    const onLayout = (event) => {
      const {width} = event.nativeEvent.layout

      console.log(width)
      setSearchWidth(width)
      console.log(searchWidth)
    }


    //* ADD PRODUCT BUTTON AND DELETE PRODUCT FROM LIST*/

    const addNewProduct = () => {
      if(pickedProduct !== null && pickedAmount !== null) {
        const typeSearch = productData.filter(obj => {
          return obj.name === pickedProduct
          
        })

        const finalType = typeSearch.map(item => {
          return item.type
        })

        const getIconName = typeSearch.map(item => {
          return item.name
        })
        
        const nameString = getIconName.toString()

        const  stringtype = finalType.toString()

        const checkKey = pickedProduct+pickedAmount+specs


     //* TO OVERCOME REPEATED PRODUCTS */

        const tempFruits = frvg.map(item => {
          return item.key
        })
        

        const fruitCheck = tempFruits.filter(item => {
          if(item.match(checkKey)) {
            return item
          } else { return null}
        })

        const tempMeat = mtmlk.map(item => {
          return item.key
        })
  
        const meatCheck = tempMeat.filter(item => {
          if(item.match(checkKey)) {
            return item
          } else { return null}
        })

        const tempSnacks = snch.map(item => {
          return item.key
        })
  
        const snacksCheck = tempSnacks.filter(item => {
          if(item.match(checkKey)) {
            return item
          } else { return null}
        })

          if(stringtype === 'frvg' ) {
            

            if(fruitCheck[0]) { 
              
              alert('Same product is added')} 
              else {
              const newDATA = [...frvg, {productName: pickedProduct, amountOf: pickedAmount, productSpecs: specs, productPreview: nameString, key: pickedProduct+pickedAmount+specs, completed: false, productType: stringtype}]
              setFrvg(newDATA)

                }
            } 

          else if (stringtype === 'mtmlk') {

      
            if(meatCheck[0]) { 
              alert('Same product is added')} 
              else {
              const newDATA = [...mtmlk, {productName: pickedProduct, amountOf: pickedAmount, productSpecs: specs, productPreview: require('../Assets/images/products/pineapple.png'), key: pickedProduct+pickedAmount, completed: false, productType: stringtype}]
              setMtmlk(newDATA)
                
                } 
            }
          else if (stringtype === 'snch') {

            if(snacksCheck[0]) { 
              alert('Same product is added')} 
              else {
              const newDATA = [...snch, {productName: pickedProduct, amountOf: pickedAmount, productSpecs: specs, productPreview: require('../Assets/images/products/pineapple.png'), key: pickedProduct+pickedAmount, completed: false, productType: stringtype}]
              setSnch(newDATA)
               
                }
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

    const clearProductInput = () => {
      setPickedProduct(null)
    }

    const clearAmountInput = () => {
      setPickedAmount(null)
    }

    const clearSpecsInput = () => {
      setSpecs(null)
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
    
    const CheckBox =({id, triggerSelect, completed, type, style})=> {

        const onPress = () => {
          triggerSelect(id, type)
          console.log(id)
        };

        return (
          <Pressable
          onPress={onPress}
          style={[styles.checkBox, style,
          completed && {backgroundColor: '#FF9C33'}]}
          >
            {completed && <Octicon name="check" size={18} color='black' style={{position: 'absolute'}}/>}
          </Pressable>
        )
      }

  //* SPECS RENDER FOR EACH ITEM  */

      const renderEachItem = (item) => {


        if(item.productSpecs === null ) {
          
        return (
          <View style={{
            flexDirection: 'row',
            marginHorizontal: 0.125*WIDTH,
            marginBottom: 10,
            alignItems: 'center'
            
          }}> 
            <Image source={imageSelect(item.productPreview)} resizeMode='contain' style={{height: 20,
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
              style={{marginLeft: 85}}
              />

            {admin && 
                <TouchableOpacity 
                  onPress={() => deleteProduct(item.key, item.productType)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15
                }}>
          
                    <Icon name="circle-with-cross" size={20} color='#F45D01'/>
              
               </TouchableOpacity>
            }
          </View>
        ) }
        else {
          return (
            
            <View>

                <ModalPopup visible={visible}> 

                <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['#DCE35B', '#45B649']} style={{
                        flex:1,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 5,

                      }}> 

                  <View style={{
                    flex:1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingBottom: 20,
                    backgroundColor: 'black',
                    width: '100%',
                    height: '100%',
                    borderRadius: 20
                    
                    }}>
                    
                    <Text style={{
                      color: 'white',
                      position: 'absolute',
                      top: 30,
                      width: '75%',
                      height: '65%',
                      textAlign: 'center',
                      fontSize: 16
                      }}>{item.productSpecs}</Text>
                    <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['#DCE35B', '#45B649']} style={{
                        width:70,
                        height:30,
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center'

                      }}> 
                      <TouchableOpacity onPress={() => setVisible(false)} style={styles.confirmButton}>
                      <Text style={{color: '#DCE35B'}}>Okay</Text>
                      </TouchableOpacity>
                    </LinearGradient>

                  </View>

                  </LinearGradient>

                </ModalPopup> 

            <View style={{
              flexDirection: 'row',
              marginHorizontal: 0.125*WIDTH,
              marginBottom: 10,
              alignItems: 'center',
              
              
            }}> 
              <Image source={imageSelect(item.productPreview)} resizeMode='contain' style={{height: 20,
              width: 20,}} />
              <Text style={[styles.productList, {
                marginLeft: 30, width: 50
              }]} >{item.productName}</Text>
              <Text style={[styles.productList, {
                marginLeft: 50,  width: 50
              }]}>{item.amountOf}</Text>
              
              
                <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['#DCE35B', '#45B649']} style={{
                  width:50,
                  height:25,
                  marginLeft: 20,
                  justifyContent: 'center',
                  alignItems: 'center'

                }}>
                  <TouchableOpacity onPress={() => setVisible(true)} style={{
                
                justifyContent: 'center',
                backgroundColor: 'black',
                width: 45,
                height: 20
              }}> 
                  <Text style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#DCE35B'
                  }}>note</Text>

                  </TouchableOpacity>
                </LinearGradient>
              
              
              <CheckBox
                
                id={item.key}
                type={item.productType}
                completed={item.completed}
                triggerSelect={triggerSelect}
                
                />
            {admin && 
            <TouchableOpacity 
            onPress={() => deleteProduct(item.key, item.productType)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15
        }}>
          
          <Icon name="circle-with-cross" size={20} color='#F45D01'/>
              
            </TouchableOpacity>
            }
              
            </View>

            </View>
          )
        }
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
const updateTime = format(new Date(), 'dd MMM, HH:mm')
setTimeout(() => {
  setLoading(false)
}, 800);
const roomName = await AsyncStorage.getItem('roomName')

console.log(updateTime)

    firestore()
    .collection('baskets')
    .doc(roomName)
    .set({
      frvg: frvg,
      mtmlk: mtmlk,
      snch: snch,
      updated: true,
      time: updateTime,
      items: frvg.length + mtmlk.length + snch.length,
    }, {merge: true})
    
  }
  

    return (
        <View style={[styles.backgroundBasket,
        loading && {opacity: 0.7},
        ]}>
          <StatusBar  backgroundColor='#000000'/>
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

          <TouchableOpacity 
          onPress={() => navigation.navigate('Tabnavigator', {screen: 'Home'})} 
          style={styles.homeButton}>
            <Text style={{
              textAlign: 'center',
              color: '#FF9C33'
            }}>
              Home
            </Text>
             </TouchableOpacity>          
            <Image style={{
              width: 0.8*WIDTH,
              height: 110,
              marginTop: 22,
            }}source={require('../Assets/images/shopCatGood.gif')} />
            </View>
          <View style={{
              marginTop: 19,
              marginLeft: 0.1*WIDTH,
              marginRight: 0.1*WIDTH,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
              
              }}>
            <View style={{
              flex: 2,
              paddingRight: 20,
              justifyContent: 'space-between',
              height: 120

            }}>

            <View style={{
                  height:35,
                  flexDirection: 'row',
                  position: 'relative',
                  
                  
                }}>
                <TextInput
                placeholder={'Product Search'}
                style={styles.productSearch}
                placeholderTextColor={'#a2a4ac'}
                onChangeText={onSearch}
                value={pickedProduct}
                onLayout={onLayout}
                onFocus={clearProductInput}
                />

                { searching &&
                <SearchDropDown
                onPress={() => 
                  setSearching(false)}
                data={filtered}
                changePicked={product => setPickedProduct(product)}
                size={searchWidth}
                />
                }

            </View>

                

            <View style={{
                  height:35,
                  flexDirection: 'row',
                  position: 'relative',
                  
                }}>
                  <TextInput
                  placeholder={'Amount'}
                  style={styles.amountSearch}
                  placeholderTextColor={'#a2a4ac'}
                  onChangeText={onAmount}
                  value={pickedAmount}
                  onLayout={onLayout}
                  onFocus={clearAmountInput}
                  />


                  { amountSearch &&
                  <AmountDropDown
                  onPress={() => 
                    setAmountSearch(false)}
                  amount={amountFilt}
                  changePicked={amount => setPickedAmount(amount)}
                  size={searchWidth}
                  />
                  } 

            </View>
            
            <View style={{
              height: 35, 
              flexDirection: 'row',
              position: 'relative',
              
              }}> 
                <TextInput
                placeholder={'Specify'}
                style={styles.specifySearch}
                placeholderTextColor={'#a2a4ac'}
                onChangeText={setSpecs}
                value={specs}
                onFocus={clearSpecsInput}
                />

            </View>
            
            </View>
            <View style= {{
              flex: 1,
              height: 80,
              }}>

            <TouchableOpacity style={styles.addButton} onPress={addNewProduct}>
                  <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>

            </View>
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
               renderItem={({item, index}) => renderEachItem(item)}
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