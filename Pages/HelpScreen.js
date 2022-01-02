import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { styles } from '../AllStyles';

const { width: WIDTH } = Dimensions.get('window');
  const { height: HEIGHT } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        image: require('../Assets/images/onBoarding/image1.png'),
        title: 'Welcome'
    },
    {
        id: '2',
        image: require('../Assets/images/onBoarding/image2.png'),
        title: 'Create or enter basket'
    },
    {
        id: '3',
        image: require('../Assets/images/onBoarding/image3.png'),
        title: 'Adding new product'
    },
    {
        id: '4',
        image: require('../Assets/images/onBoarding/image4.png'),
        title: 'aving process'
    }
]

const Slide = ({item}) => {
    return (
        <View style={{alignItems:'center'}}>
            <Image source={item.image} resizeMode='contain' style={{height: HEIGHT*0.75, width: WIDTH}}/>
        </View>
    )
}

const HelpScreen = ({navigation}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const ref = useRef(null)
    const Footer = () => {
        return (
            <View style={{
                height: HEIGHT*0.25,
                justifyContent: 'space-between',
                paddingHorizontal: 20}}>
                    <View style={{
                        flexDirection:'row', 
                        justifyContent:'center', 
                        marginTop:20}}>
                    {slides.map((_,index)=> (
                        <View key={index} style={[styles.indicator, currentSlideIndex == index && {
                            backgroundColor:'#45B649',
                            width: 25
                        }]}/>
                    ))}
                    </View>
                    <View style={{marginBottom: 20}}>
                        {currentSlideIndex == slides.length-1 ? (
                            <View style={{flexDirection:'row', justifyContent:'center'}}> 
                            <TouchableOpacity style={[styles.btn]} onPress={() => navigation.navigate('Tabnavigator', {screen: 'Home'})}>
                                <Text style={{fontWeight:'bold'}}>GET STARTED!</Text>
                            </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={{flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
                            <Text style={{fontWeight:'bold'}}>NEXT</Text>
                        </TouchableOpacity>
                        </View>
                        )}
                        
                        
                    </View>
            </View>
        )
    }
    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x
        const currentIndex = Math.round(contentOffsetX/WIDTH);
        setCurrentSlideIndex(currentIndex)
        console.log(currentIndex)
    }
    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if(nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * WIDTH;
            ref?.current.scrollToOffset({offset});
            setCurrentSlideIndex(nextSlideIndex)
        }
    }
    return(
    <SafeAreaView style={{flex:1, backgroundColor:'#000000'}}>
        <StatusBar backgroundColor='#000000'/>
        <FlatList
            onMomentumScrollEnd={updateCurrentSlideIndex}
            ref={ref}
            data={slides}
            contentContainerStyle={{height: HEIGHT*0.75}}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Slide item={item}/>}
        />
        <Footer/>
    </SafeAreaView>
    )}

export default HelpScreen;