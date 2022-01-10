import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState, useEffect } from 'react';
import {
    
    View,
    StatusBar,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Pressable,
    SectionList,
    ActivityIndicator,
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback,
    Modal
  
  } from 'react-native';
  import SearchDropDown from '../elements/SearchDropDown'
  import AmountDropDown from '../elements/AmountDropDown'
  import {styles} from '../AllStyles'
  
  import Octicon from 'react-native-vector-icons/Octicons'
  import Icon from 'react-native-vector-icons/Entypo'
  import AntDesign from 'react-native-vector-icons/AntDesign'

  import firestore from '@react-native-firebase/firestore'
  import firebase from '@react-native-firebase/app'
  
  import format from 'date-fns/format'
  import images from '../Assets/images/index'
  import ModalPopup from '../elements/ModaPopUp';
  import SQlite from 'react-native-sqlite-storage'
  import DropDownPicker from 'react-native-dropdown-picker'
  import {scaledWidth, scaledHeight} from '../elements/sizeScale'
  
  import LinearGradient from 'react-native-linear-gradient';

  const db = firebase.firestore();
  const collectionRef = db.collection('baskets')
  

  successcb = () => {
    console.log('database open')
  }
  errorcb = () => {
    console.log('failed')
  }
  const sqldb = SQlite.openDatabase({name: 'dbProducts.db', createFromLocation: '~dbProducts.db'}, successcb, errorcb)
  
  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      {children}
    </TouchableWithoutFeedback>
  );
  

  const { width: WIDTH } = Dimensions.get('window');
  const { height: HEIGHT } = Dimensions.get('window');


  function Basket ({navigation}) {

    const [admin, setAdmin] = useState(false)

    const [database, setDatabase] = useState(null)

    const [frvg, setFrvg] = useState([])
    const [mtmlk, setMtmlk] = useState([])
    const [snch, setSnch] = useState([])
    const [cupb, setCupb] = useState([])
    const [dess, setDess] = useState([])
    const [drinks, setDrinks] = useState([])
    const [hlth, setHlth] = useState([])
    const [house, setHouse] = useState([])
    const [kids, setKids] = useState([])
    const [dairy, setDairy] = useState([])
    
    const [firstTime, setFirstTime] = useState(false)

    const [loading, setLoading] = useState(true)

    const [basketName, setBasketName] = useState(null)
    
    const [visBasket, setVisBasket] = useState(null)

    const [visibleNoneSpec, setVisibleNoneSpec] = useState(false)
    const [visibleSpec, setVisibleSpec] = useState(false)
    const [visOrNot, setVisOrNot] = useState(false)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Fruit & Veg', value: 'frvg'},
      {label: 'Meats & Fish', value: 'meat'},
      {label: 'Dairy', value: 'dairy'},
      {label: 'Snacks & Chocolate', value: 'snacks'},  // ADD PRODUCTS HERE
      {label: 'Cupboard & Pets', value: 'cupb'},
      {label: 'Desserts & Bread', value: 'dessbread'},
      {label: 'Drinks', value: 'drinks'},
      {label: 'Health & Beauty', value: 'hlthbty'},
      {label: 'Household', value: 'house'},
      {label: 'Kids', value: 'kids'}
    ]);

    useEffect(() => {
      async function firstTimeHere() {
        const first = await AsyncStorage.getItem('firstTimeBasket')
        const parsedFirst = JSON.parse(first)

        if(parsedFirst === null) {
          console.log('Tut?', parsedFirst)
          setFirstTime(true)
        } else {
          console.log('zdes', firstTime, parsedFirst)
          setFirstTime(false)}
      }
      async function fetchData() {
        setLoading(true)

        const roomName = await AsyncStorage.getItem('roomName')
        setBasketName(roomName)

        const visualBasket = () => {if(roomName.length <= 12) {
          return roomName
        } else {
          return roomName.slice(0, 12) + ".."
        }}
        
        setVisBasket(visualBasket)
  
        sqldb.transaction((tx)=> {
          tx.executeSql('SELECT * FROM products', [], (tx, results) => {
            let len = results.rows.length
            if(len > 0) {
              let tempArrray = [];
              for(let i = 0; i < len; i++){
                tempArrray.push(results.rows.item(i))
              }
              
              setDatabase(tempArrray)
              
            } else { console.log('Results.rows = empty')}
          })
        })
  
        const snapshot = await collectionRef.where('room', '==', roomName).get()
        try{
        if(!snapshot.empty) {
          const uid = await AsyncStorage.getItem('uid')
          const docCheck = snapshot.docs[0].data()
  
          if(docCheck.updated) {
            
            const data1 = docCheck.frvg
            const data2 = docCheck.mtmlk
            const data3 = docCheck.snch
            const data4 = docCheck.cupb
            const data5 = docCheck.dess
            const data6 = docCheck.drinks
            const data7 = docCheck.hlth
            const data8 = docCheck.house
            const data9 = docCheck.kids
            const data10 = docCheck.dairy
  
            setFrvg(data1)
            setMtmlk(data2)
            setSnch(data3)
            setCupb(data4)
            setDess(data5)
            setDrinks(data6)
            setHlth(data7)
            setHouse(data8)
            setKids(data9)
            setDairy(data10)

            setLoading(false)
            
            
          }
          console.log(docCheck.creator, uid)
          if (docCheck.creator === uid) {
            
            setAdmin(true)
            setLoading(false)
            
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
      }
      
      fetchData()
      firstTimeHere()
      

  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
          setKeyboardVisible(true)
      }
  )
  const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
          setKeyboardVisible(false)
      }
  )
      return () => {
          keyboardDidHideListener.remove()
          keyboardDidShowListener.remove()
      } 
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

    const [tempSpec, setTempSpec] = useState([])
    const [tempName, setTempName] = useState([])
    const [tempAmount, setTempAmount] = useState([])

    const [isRender, setIsRender] = useState(false)

    const [searchWidth, setSearchWidth] = useState(null)

    const imageSelect = picker => {

      const temp = images[picker]

     /* const tempArray = pickerArray
      const check = tempArray[picker] */

      if (temp) {
        return images[picker]
      } else {
        return images['newProduct']
      }
      
    }
    //** SEARCH FOR PRODUCTS AND AMOUNT */

    const onSearch = (text) => {
      if (text) {
         setSearching(true)
         setPickedProduct(text)
         const temp = text.toLowerCase()
         const tempProductNames = database.map(item =>  {
          return item.name
      }) 
      setProductNames(tempProductNames)
         const tempList = tempProductNames.filter(item => {
           if(item.match(temp)) {
           return item
           }
         })
          setFiltered(tempList)
       } else {
         setPickedProduct(null)
          setSearching(false)
          setFiltered(productNames)
      }
    };
    const onLayout = (event) => {
      const {width} = event.nativeEvent.layout
      setSearchWidth(width)
    }
    //* ADD PRODUCT BUTTON AND DELETE PRODUCT FROM LIST*/

    const addNewProduct = () => {
      
      if(pickedProduct !== null && pickedAmount !== null) {
        
        const productSearch = database.filter(obj => {
          
          return obj.name === pickedProduct
          
        })

        if (productSearch.length === 0) {
          setVisOrNot(true)
          
        }

        const finalType = productSearch.map(item => {
          console.log(item.type, 'type')
          return item.type
        })

        const getIconName = productSearch.map(item => {
          console.log(item.name, 'name')
          return item.name
        })
        
        const nameString = getIconName.toString()

        const  stringtype = finalType.toString()

        const checkKey = pickedProduct+pickedAmount+specs


     //* TO OVERCOME REPEATED PRODUCTS */

        
        // NEW FUNCTIONS TO CHECK DOUPLCIATES AND ADD PRODUCTS USING switch{}
        
        function checker (specs)  {

          const firstCheck = specs.map(item=> {
            return item.key
          })

          const secondCheck = firstCheck.filter(item => {
            if(item.match(checkKey)) {
              return item
            } else { return null}
          })
          return secondCheck[0]
        }

        function addProduct (type, setSpec) {
          if(checker(type)) { 
              
            alert('Same product is added')} 
            else {
            const newDATA = [...type, {productName: pickedProduct, amountOf: pickedAmount, productSpecs: specs, productPreview: nameString, key: pickedProduct+pickedAmount+specs, completed: false, productType: stringtype}]
            setSpec(newDATA)
            console.log(type)
            
            Keyboard.dismiss()

              }
        }

        switch(stringtype) {
          case 'frvg': 
           addProduct(frvg, setFrvg);
          break;

          case 'meat':
            addProduct(mtmlk, setMtmlk);
          break;

          case 'snacks':
            addProduct(snch, setSnch);
          break;

          case 'cupb':
            addProduct(cupb, setCupb);
          break;

          case 'dessbread':
            addProduct(dess, setDess);
          break;

          case 'drinks':
            addProduct(drinks, setDrinks);
          break;

          case 'hlthbty':
            addProduct(hlth, setHlth);
          break;

          case 'house':
            addProduct(house, setHouse);
          break;

          case 'kids':
            addProduct(kids, setKids);
          break;

          case 'dairy':
            addProduct(dairy, setDairy);
          break;
        }

        setSpecs(null)
    
    } else {
         console.log(pickedProduct, pickedAmount)
        alert('Please pick product and amount')
      }
    }

    const deleteProduct = (id, type) => {

      function deleting (type, setSpec) {
        const newarr = type.filter(item => item.key !== id)
        setSpec(newarr)
      }
      
      if(admin) {
        const stringType = type.toString() 
        switch(stringType){
          case 'frvg':
            deleting(frvg, setFrvg)
          break;

          case 'meat':
            deleting(mtmlk, setMtmlk);
          break;

          case 'snacks':
            deleting(snch, setSnch);
          break;

          case 'cupb':
            deleting(cupb, setCupb);
          break;

          case 'dessbread':
            deleting(dess, setDess);
          break;

          case 'drinks':
            deleting(drinks, setDrinks);
          break;

          case 'hlthbty':
            deleting(hlth, setHlth);
          break;

          case 'house':
            deleting(house, setHouse);
          break;

          case 'kids':
            deleting(kids, setKids);
          break;

          case 'dairy':
            deleting(dairy, setDairy);
          break;

        }
      } else {
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
    
//* ADD NEW PRODUCT TO DATABASE */
 const addToDb = async () => {
   
try { 
   await sqldb.transaction(async(tx)=> {
     
     await tx.executeSql('INSERT INTO products VALUES (?,?)', [pickedProduct, value], )
  })

  sqldb.transaction(async(tx)=> {
    await tx.executeSql('SELECT * FROM products', [], (tx, results) => {
      let len = results.rows.length
      if(len > 0) {
        let tempArrray = [];
        for(let i = 0; i < len; i++){
          tempArrray.push(results.rows.item(i))
        }
        
        setDatabase(tempArrray)
        
      } else { console.log('Results.rows = empty')}
    })
  })

   setVisOrNot(false)
   setLoading(false)
} catch (err){
  alert(err)
}}

 async function firstFunc(){
   console.log('Bred!')
  await AsyncStorage.setItem('firstTimeBasket', JSON.stringify(false))
  setFirstTime(false)
 }

    //* CHECKBOX PART */
    const triggerSelect = (id, type) => {

      const stringType = type.toString()
      

      function triggerAction (setter) {

        setter(prev =>
          prev.map(
            item => item.key === id
            ? {...item, completed: !item.completed}
            : item
          ))
      }
      
      switch(stringType){
        case 'frvg':
          triggerAction(setFrvg);
        break;

        case 'meat':
          triggerAction(setMtmlk);
          break;

          case 'snacks':
            triggerAction(setSnch);
          break;

          case 'cupb':
            triggerAction(setCupb);
          break;

          case 'dessbread':
            triggerAction(setDess);
          break;

          case 'drinks':
            triggerAction(setDrinks);
          break;

          case 'hlthbty':
            triggerAction(setHlth);
          break;

          case 'house':
            triggerAction(setHouse);
          break;

          case 'kids':
            triggerAction(setKids);
          break;

          case 'dairy':
            triggerAction(setDairy);
          break;
      }
  
    
    }
    
    const CheckBox =({id, triggerSelect, completed, type, style})=> {

        const onPress = () => {
          triggerSelect(id, type)
          
        };

        return (
          <Pressable
          onPress={onPress}
          style={[styles.checkBox, style,
          completed && {backgroundColor: '#45B649', borderColor:'#45B649'}]}
          >
            {completed && <Octicon name="check" size={18} color='black' style={{position: 'absolute'}}/>}
          </Pressable>
        )
      }

    //* DELETE BASKET AND RETURN TO "HOME SCREEN */

    const  deleteBasket = async () => {

      const uid = await AsyncStorage.getItem('uid')
try {
firestore()
.collection('baskets')
.doc(basketName)
.collection('userList')
.doc(uid).delete()

.then 
        navigation.navigate('Tabnavigator', {screen: 'Home'})

console.log('basket deleted ')

} catch(E) { 
  console.log(E)

}
    }

  //* RENDER FOR EACH HEADER */

const renderEachHeader = (section) => {

  
  if(section.data.length > 0) {
    
    return (
      <Text style={styles.sectionStyle}>{section.title}</Text>
    )
  } else {
    return null
  }
}


  //* SPECS RENDER FOR EACH ITEM  */

      const renderEachItem = (item, section) => {

        

function trim () {
  if(item.productName.length <= 9) {
    return item.productName
  } else {
    return item.productName.slice(0,9) + ".."
  }
}

function trimAmount () {
  if(item.amountOf.length <= 5) {
    return item.amountOf
  } else {
    return item.amountOf.slice(0,5) + "."
  }

}

const getSpec = (id, type ) => {
  function getData (type){
const newArray = type.filter(item => item.key === id)
const newSpec = newArray.map(item=> {return item.productSpecs})
const newName = newArray.map(item => {return item.productName})
const newAmount = newArray.map(item => {return item.amountOf})
console.log(newSpec)
setTempSpec(newSpec)
setTempName(newName)
setTempAmount(newAmount)
  }
  const stringtype = type.toString()
  switch(stringtype) {
          case 'frvg':
            getData(frvg, setFrvg)
          break;

          case 'meat':
            getData(mtmlk, setMtmlk);
          break;

          case 'snacks':
            getData(snch, setSnch);
          break;

          case 'cupb':
            getData(cupb, setCupb);
          break;

          case 'dessbread':
            getData(dess, setDess);
          break;

          case 'drinks':
            getData(drinks, setDrinks);
          break;

          case 'hlthbty':
            getData(hlth, setHlth);
          break;

          case 'house':
            getData(house, setHouse);
          break;

          case 'kids':
            getData(kids, setKids);
          break;

          case 'dairy':
            getData(dairy, setDairy);
          break;
  }
}
        if(item.productSpecs === null ) {
          
        return (
          <View>
            <ModalPopup visible={visibleNoneSpec} heightParam='40%'> 
              <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['#DCE35B', '#45B649']} style={styles.modalGradient}> 

                <View style={styles.modalView}>
                <Text style={styles.modalText}>{tempName} : {tempAmount} {'\n'}{tempSpec}</Text>
                  <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['#DCE35B', '#45B649']} style={styles.modalButtonGradient}> 
                    <TouchableOpacity onPress={() => {setVisibleNoneSpec(false), setLoading(false)}} style={styles.confirmButton}>
                       <Text style={{color: '#DCE35B'}}>Okay</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

              </LinearGradient>
            </ModalPopup> 
          <TouchableOpacity onPress={() => {setVisibleNoneSpec(true),setLoading(true), getSpec(item.key, item.productType)}}style={{
            flexDirection: 'row',
            marginHorizontal: scaledWidth('5%'),
            marginBottom: 10,
            alignItems: 'center',
            width: scaledWidth('90%'),
            justifyContent: 'space-between'
          }}> 
            <Image source={imageSelect(item.productPreview)} resizeMode='contain' style={{height: 20,
            width: 20,}} />
            <Text style={[styles.productList, {
               width: '30%'
            }]} >{trim()}</Text>
            <Text style={[styles.productList, {
                width: '15%'
            }]}>{trimAmount()}</Text>
            <View style={{width: '7%',  height: 25}}></View>
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
                }}>
                    <Icon name="circle-with-cross" size={20} color='#F45D01'/>
              
               </TouchableOpacity>
            }
          </TouchableOpacity>
          </View>
        ) }
        else {
          return (
            
            <View>

                <ModalPopup visible={visibleSpec} heightParam='40%'> 

                <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['#DCE35B', '#45B649']} style={styles.modalGradient}> 

                  <View style={styles.modalView}>
                  
                    <Text style={styles.modalText}>{tempName} : {tempAmount} {'\n'}{tempSpec}</Text>
                    <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['#DCE35B', '#45B649']} style={styles.modalButtonGradient}> 
                      <TouchableOpacity onPress={() => {setVisibleSpec(false), setLoading(false)}} style={styles.confirmButton}>
                      <Text style={{color: '#DCE35B'}}>Okay</Text>
                      </TouchableOpacity>
                    </LinearGradient>

                  </View>

                  </LinearGradient>

                </ModalPopup> 

            <TouchableOpacity onPress={() => {setVisibleSpec(true), setLoading(true), getSpec(item.key, item.productType)}}style={{
              flexDirection: 'row',
              marginHorizontal: scaledWidth('5%'),
              marginBottom: 10,
              alignItems: 'center',
              width: scaledWidth('90%'),
              justifyContent: 'space-between'
              
            }}> 
              <Image source={imageSelect(item.productPreview)} resizeMode='contain' style={{height: 20,
              width: 20,}} />
              <Text style={[styles.productList, {
                 width: '30%'
              }]} >{trim()}</Text>
              <Text style={[styles.productList, {
                  width: '15%'
              }]}>{trimAmount()}</Text>
              
              
                <View style={{
                  width:'7%',
                  height:25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <View style={{
                justifyContent: 'center',
                alignItems:'center',
                flex:1,
                height: 20,
              }}> 
                  <AntDesign name='star' color='#ffb703' size={17}/>

                  </View>
                </View>
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
        }}>
          
          <Icon name="circle-with-cross" size={20} color='#F45D01'/>
              
            </TouchableOpacity>
            }
              
            </TouchableOpacity>

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



    firestore()
    .collection('baskets')
    .doc(roomName)
    .set({
      frvg: frvg,
      mtmlk: mtmlk,
      snch: snch,
      cupb: cupb,
      dess: dess,
      drinks: drinks,
      hlth: hlth,
      house: house,
      kids: kids,
      dairy: dairy,
      updated: true,
      time: updateTime,
      items: frvg.length+mtmlk.length+snch.length+cupb.length+dess.length+drinks.length+hlth.length+house.length+kids.length+dairy.length,
    }, {merge: true})
    
  }
  

    return (
        <View style={[styles.backgroundBasket,
        loading && {opacity: 0.7},
        ]}>
          <StatusBar  barStyle="light-content"/>
          <View style={styles.loader}>
          <ActivityIndicator
          animating={loading}
          size="large"
          color="#EFF32B"
          />
          </View>
          
          <SafeAreaView style={{flex: 1, width: WIDTH}}>
          
          <View style={{alignItems: 'center',}}>
          
          <Text style={{
            fontSize:30,
            color:'white',
            }}>{visBasket}</Text>

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

          <TouchableOpacity
          onPress={deleteBasket}
          style={styles.deleteButton}>
            <Text style={{
              textAlign: 'center',
              color: '#FF9C33'
            }}>
              Delete
            </Text>
            </TouchableOpacity>          
            <Image style={{
              width: 0.8*WIDTH,
              height: 110,
              marginTop: 22,
            }}source={require('../Assets/images/shopCatGood.gif')} />
            </View>

            <HideKeyboard>
              <TouchableWithoutFeedback onPress={()=> setSearching(false)}>
          <View style={{
              marginTop: scaledHeight('2.7%'),
              marginLeft: 0.1*WIDTH,
              marginRight: 0.1*WIDTH,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
              
              }}>
            <View style={{
              flex: 2,
              paddingRight: scaledWidth('5%'),
              justifyContent: 'space-between',
              height: 120
            }}>

            <View style={{
                  height:35,
                  flexDirection: 'row',
                  position: 'relative',
                }}>
                <TextInput
                placeholder={'Product Name'}
                style={styles.productSearch}
                placeholderTextColor={'#a2a4ac'}
                onChangeText={onSearch}
                value={pickedProduct}
                onLayout={onLayout}
                onFocus={clearProductInput}
                autoComplete={'off'}
                autoCorrect={false}
                autoCapitalize='none'
                />
                
                { searching &&
                <SearchDropDown
                onPress={() => 
                  setSearching(false)}
                data={filtered}
                changePicked={product => {setPickedProduct(product)}}
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
                  onChangeText={setPickedAmount}
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
                placeholder={'Additional info'}
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
              height: scaledHeight('11.5%'),
              }}>

            <TouchableOpacity style={styles.addButton} onPress={addNewProduct}>
                  <Text style={styles.addButtonText}>ADD</Text>
            </TouchableOpacity>

            </View>
            </View>
            </TouchableWithoutFeedback>
            </HideKeyboard>
            <View>
            {firstTime && <ModalPopup visible={firstTime} heightParam='40%'>
            
            <View style={{
              flex:1,
              alignItems:'center',
              borderRadius: 15,
              borderWidth:5,
              }}>
                <View style={{flex:1, justifyContent:'center'}}>
            <Text style={{color: 'white', fontSize:18}}>Welcome to smartBasket!</Text>
                </View>
                <View style={{flex:2, justifyContent:'center',}}>
            <Text style={{color:'white', textAlign: 'center', fontSize:16}}>Please make sure to press button <Text style={{color:'#F45D01'}}>"Save"</Text> once all products are picked.</Text>
                </View>
                <View style={{flex:1, justifyContent:'center'}}>
                  <TouchableOpacity onPressIn={()=> firstFunc()} style={[styles.confirmButton, {backgroundColor:'#45B649'}]}>
                    <Text style={{color:'black'}}>Okay</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </ModalPopup>}
              <ModalPopup visible={visOrNot} heightParam='40%'>
                <LinearGradient start={{x:0, y:0}} end={{x:1, y:0}} colors={['#ffba08', '#e85d04']} style={{
                        flex:1,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 5,

                      }}>
                  <View style={{
                    flex:1,
                    alignItems: 'center',
                    paddingBottom: 20,
                    backgroundColor: 'black',
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                    }}>
                      <Text style={{
                      color: 'white',
                      width: '80%',
                      textAlign: 'center',
                      fontSize: 15,
                      marginTop: 20,
                      }}>Oops! Can't find product: 
                      <Text  style={{
                        color: '#FF9C33'
                      }}> "{pickedProduct}"
                      </Text>
                      </Text>
                      <DropDownPicker 
                      open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={{
                          backgroundColor: "#a2a4ac",
                          flex:1,
                        }}
                        containerStyle={{
                          width: '80%',
                          height: '12%',
                          marginTop: 30,
                      }}
                      placeholder="Product category"
                      dropDownContainerStyle={{
                        backgroundColor: "#a2a4ac"
                      }}
                        />
                        <Text style={{
                      color: '#a2a4ac',
                      width: '80%',
                      textAlign: 'center',
                      fontSize: 12,
                      marginTop: 20
                      }}>*Once you add the product manually, it will be available for you permanently.
                        </Text>
                        <LinearGradient  colors={['#ffba08', '#e85d04']} style={{
                        width:70,
                        height:30,
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 17

                      }}> 
                      <TouchableOpacity onPress={() => {
                      setLoading(true),
                      addToDb()
                    }
                    } style={styles.confirmButton}>
                      <Text style={{color: 'white'}}>Add</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    
                  </View>
                  <View style={{
                    position: 'absolute',
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: 'black',
                    top: -10,
                    right: -10
                  }}>
                    <TouchableOpacity style={{flex:1}} onPress={() => setVisOrNot(false)}>
                    <Icon name="circle-with-cross" size={30} color='#F45D01'/>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>

              </ModalPopup>
            </View>

            
            <View style={{
              marginTop: 21,
              flex:1,
            }}>
              <SectionList 
               sections={[
                {title: 'Fruit & Veg', data: frvg},
                {title: 'Meats & Fish', data: mtmlk},
                {title: 'Cupboard & Pets', data: cupb},
                {title: 'Desserts & Bread', data: dess},
                {title: 'Drinks', data: drinks},
                {title: 'Snacks & Chocolate', data: snch}, 
                {title: 'Health & Beauty', data: hlth},
                {title: 'Household', data: house},
                {title: 'Kids', data: kids},
                {title: 'Dairy', data: dairy},
               ]}
               renderSectionHeader={({section}) => renderEachHeader(section)}  
               initialNumToRender= {20}        
               keyExtractor={(item) => item.key.toString()}
               extraData={isRender}
               nestedScrollEnabled={true}
               ItemSeparatorComponent={separatorUnit}
               renderItem={({item, section, index}) => renderEachItem(item, section)}
              />
              
            </View>
            
            </SafeAreaView>
            {!isKeyboardVisible &&
            <TouchableOpacity 
            style={styles.updateButton}
            onPress={saveData}>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Save</Text>
              </TouchableOpacity>}
        </View>
    )
  }

  export default Basket;