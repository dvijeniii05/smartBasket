import React from 'react'

import {StyleSheet, Dimensions, StatusBar,} from  'react-native'

const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');

const styles= StyleSheet.create ({

homeBackGround: {
    backgroundColor: '#1b1b22',
    flex: 1,
      width: null,
      height: null,
    
},

loader: {
  position:'absolute', 
  justifyContent:'center', 
  alignItems: 'center',
  top: 0, 
  left: 0, 
  right: 0, 
  bottom: 0, 
},

maybeBox: {
  backgroundColor: '#2E2E38',
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 35,
    height:120,
    borderRadius: 30,
    justifyContent: 'center'
},


containerMaybe: {
left:100,
flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

},

basketName: {
  color: '#a2a4ac',
  fontSize: 15,
  
  
},

numberOfItems: {
  color: '#efeef2',
  fontSize: 40,
  
  
  
},

updateTime: {
  color: '#a2a4ac',
  fontSize: 10,
  
},

wordItems: {
  color: '#a2a4ac',
  fontSize: 15,
  left: 272,
  bottom: 38
},


previewItem: {
  position: 'absolute',
    height: 80,
    width: 100,
    marginLeft: 50,
    top: 20,
    justifyContent: 'center',
    resizeMode: 'contain'
    
    
},

createBackGround: {
  backgroundColor: '#1b1b22',
  flex: 1,
    width: null,
    height: null,
  paddingVertical: 160,
  paddingHorizontal: 50,
  
  justifyContent: 'center',
  alignItems: 'center',
  
},

backgroundBasket: {
  backgroundColor: '#1b1b22',
  flex: 1,
    width: null,
    height: null,
  paddingVertical: 10,
  alignItems: 'center',
  
  
},

createBasket: {
  
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
  
  marginVertical: 20,

},

registerStyle: {
  backgroundColor: '#1b1b22',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30

},

textInputBox: {
  
  width: 200,
  backgroundColor: '#121216',
  height: 55,
  borderRadius: 8,
  textAlign: 'center',
  marginVertical: 20,
  color: 'white'
  
  
},

roomCreationInputBox: {
  marginLeft: 10,
  width: 200,
  backgroundColor: '#121216',
  height: 35,
  borderRadius: 8,
  textAlign: 'center',
  marginVertical: 20,
  color: 'white'
  
  
},

registerButton: {
  top: 75,
  width: 90,
  height: 35,
  borderRadius: 15,
  backgroundColor: '#EFF32B',
  justifyContent: 'center',

},

productSearch: {
  width: 120,
  backgroundColor: '#121216',
  borderRadius: 8,
  textAlign: 'center',
  color: 'white',
  fontSize: 12,
  padding: 0
},

amountSearch: {
  width: 80,
  backgroundColor: '#121216',
  borderRadius: 8,
  textAlign: 'center',
  color: 'white',
  fontSize: 12,
  padding: 0
},

productList: {
  fontSize: 14,
  color: 'white',
  fontFamily: 'Righteous-Regular',
  textAlign: 'center',
},

checkBox: {
  height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#EFF32B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50
},

addButton: {
  width: 40,
  height: 29,
  backgroundColor: '#EFF32B',
  justifyContent: 'center',
  borderRadius: 25,
  marginLeft: 20,
},

addButtonText: {
  textAlign: 'center',
  fontSize: 12,
  fontWeight: 'bold'
},

landingPage: {
  flex: 1,
  
  alignItems: 'center',
},

logoMaybe: {
  height: 128,
  width: 128,
  tintColor: '#ABAE0A',
  marginTop: 150
  
},

logoText: {
color: 'white',
fontSize: 30,
fontFamily: 'Roboto-Thin',
marginTop: 20,

},

landingButtons: {
  width: 0.3*WIDTH,
  height: 40,
  justifyContent: 'center',
  backgroundColor: '#121216',
  marginTop:20,
  borderRadius:20,
  borderColor: 'rgba(239, 243, 43, 0.5)',
  borderWidth: 1
  
},

landingMargin: {
  marginTop: 130
},

updateButton: {
  alignItems: 'center',
  position: 'absolute',
  bottom: 20,
  backgroundColor: '#EFF32B',
  width: 70,
  height: 25,
  borderRadius: 6,
  justifyContent: 'center',
},


})

export {styles}