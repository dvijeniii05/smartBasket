import React from 'react'

import {StyleSheet, Dimensions, StatusBar,} from  'react-native'

const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');

const styles= StyleSheet.create ({

homeBackGround: {
    backgroundColor: '#000000',
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
  backgroundColor: '#000000',
  borderWidth: 1,
  borderColor: '#FF9C33',
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 35,
    height:120,
    borderRadius: 30,
    
    flexDirection: 'row'
},


containerMaybe: {
left: 100,
justifyContent: 'center',
alignItems: 'center',

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
  backgroundColor: '#000000',
  flex: 1,
    width: null,
    height: null,
  paddingVertical: 160,
  paddingHorizontal: 50,
  
  justifyContent: 'center',
  alignItems: 'center',
  
},

backgroundBasket: {
  backgroundColor: '#000000',
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

mainContainer: {
flex:1,
backgroundColor: '#000000',
justifyContent: 'center',
alignItems: 'center'
},

pickButtons: {
  width: WIDTH*0.5,
  height: WIDTH*0.2,
  margin: 35,
  borderRadius: 10,
  backgroundColor: '#F45D01',
  justifyContent:'center'
  

},

pickText: {
  textAlign:'center',
  color: 'black',
  fontWeight: 'bold',
  fontSize: 30,
},

enterOrCreateText: {
  fontSize: 25,
  color: '#F45D01',
},



registerStyle: {
  backgroundColor: 'transparent',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30

},

textInputBox: {
  borderWidth: 1,
  width: 200,
  backgroundColor: '#000000',
  height: 55,
  borderRadius: 8,
  textAlign: 'center',
  borderColor: '#F45D01',
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
  backgroundColor: '#FF9C33',
  justifyContent: 'center',

},

productSearch: {
  flex: 1,
  backgroundColor: '#121216',
  borderRadius: 8,
  textAlign: 'center',
  color: 'white',
  fontSize: 15,
  padding: 0,
  
},

amountSearch: {
  flex:1,
  backgroundColor: '#121216',
  borderRadius: 8,
  textAlign: 'center',
  color: 'white',
  fontSize: 15,
  padding: 0
},

specifySearch: {
  flex: 1,
  backgroundColor: '#121216',
  borderRadius: 8,
  textAlign: 'center',
  color: 'white',
  fontSize: 15,
  padding: 0
},

eachItemView: {
  flexDirection: 'row',
  marginHorizontal: 0.125*WIDTH,
  marginBottom: 10,
  alignItems: 'center',
  borderColor: 'red'
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
    borderColor: '#FF9C33',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15
},

addButton: {
  flex:1,
  backgroundColor: 'transparent',
  justifyContent: 'center',
  borderRadius: 25,
  margin: 15,
  borderWidth: 3,
  borderColor: '#FF9C33'
  
},

homeButton: {
  position: 'absolute',
  left: 10,
  width: 50,
  height: 40,
  backgroundColor: 'transparent',
  
  borderRadius: 10,
  justifyContent: 'center',
  
},

deleteButton: {
  position: 'absolute',
  right: 10,
  width: 50,
  height: 40,
  backgroundColor: 'transparent',
  
  borderRadius: 10,
  justifyContent: 'center',
},

addButtonText: {
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FF9C33'
},

landingPage: {
  flex: 1,
  
  alignItems: 'center',
},

logoMaybe: {
  height: 128,
  width: 128,
  tintColor: '#F45D01',
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
  backgroundColor: '#FF9C33',
  marginTop:20,
  borderRadius:20,
  borderColor: '#000000',
  borderWidth: 1
  
},

landingMargin: {
  marginTop: 130
},

updateButton: {
  alignItems: 'center',
  position: 'absolute',
  bottom: 20,
  backgroundColor: '#FF9C33',
  width: 70,
  height: 25,
  borderRadius: 6,
  justifyContent: 'center',
},

confirmButton: {
  backgroundColor: 'black',
  width: 65,
  height: 25,
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center',
},

choiceButton: {
  backgroundColor: 'black',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80,
  height: 40,
  borderRadius: 15,
  position:'absolute',
  
},

choiceColor: {
  color: '#a2a4ac'
},

popUpButton: {
  width: 60,
  height: 40,
  borderRadius:20,
  justifyContent: 'center',
  backgroundColor: '#FF9C33',
  alignContent: 'center',
  
},

choiceView: {
  position: 'absolute', 
  width:50,
  height:100, 
  backgroundColor: 'transparent', 
  zIndex: 99,
  bottom: 10,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
},

choiceSecBox: {
  position: 'absolute', 
  alignItems: 'center',  
  backgroundColor:'transparent', 
  borderRadius: 20, 
  width: 10
},

sectionStyle:{
  fontSize: 20,
  color: 'white',
  fontFamily: 'Righteous-Regular',
  textAlign: 'center',
  marginBottom: 10
},

modalGradient: {
  flex:1,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 5,
  paddingVertical: 5,
},

modalView:{
  flex:1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingBottom: 20,
  backgroundColor: 'black',
  width: '100%',
  height: '100%',
  borderRadius: 20
},

modalText: {
  color: 'white',
  position: 'absolute',
  top: 30,
  width: '75%',
  height: '65%',
  textAlign: 'center',
  fontSize: 16
},

modalButtonGradient: {
  width:70,
  height:30,
  borderRadius: 6,
  justifyContent: 'center',
  alignItems: 'center'
}


})

export {styles}
