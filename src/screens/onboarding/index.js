import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import scale from '../../constants/responsive';
import FONT_FAMILY from '../../constants/fonts';
import { IMG_Real, IMG_Monet, IMG_Vangogh } from '../../assets/images';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const {width: screenWidth} = Dimensions.get('window');  

const OnboardingScreen = (props) => {
    const views = [
        {source: IMG_Real, text: "Change your image \n  into an art picture", id:0 },
        {source: IMG_Vangogh, text: "Choose the style of \n the artist you want", id:1 },
        {source: IMG_Monet, text: "Download it and get \n    a unique picture", id:2 },
    ];
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <TouchableOpacity style={styles.subButton} onPress={() => props.navigation.navigate('AboutScreen')}>
                <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>
            <View style={styles.swiper}>
                <SwiperFlatList
                    showPagination
                    paginationStyle={styles.wrapDot}
                    paginationStyleItemActive={styles.dotActive}
                    paginationStyleItemInactive={styles.dot}
                    data={views}
                    
                    renderItem={({ item }) => (
                        <View key={item.id} style={{width: screenWidth, height: '50%'}}>
                            <Image source={item.source} style={styles.image}/>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    )}
                />      
            </View>
            <TouchableOpacity style={styles.skip} onPress={() => props.navigation.navigate('HomeScreen')}>
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDD1FF",
    },
    subButton: {
        marginTop:scale(20),
        marginLeft:scale(270),
        height:scale(50),
        width:scale(80),
        justifyContent:'center',
        backgroundColor:'#2DB3EB',
        borderRadius:scale(20),
    },
    buttonText: {
        alignSelf:'center',
        fontWeight:'400',
        fontSize: scale(18),
        lineHeight:scale(18),
    },
    swiper: {
        height: scale(600),
    },
    image: {
        marginTop: scale(100),
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: scale(20),
        zIndex: 1,
    },
    text: {
        marginTop: scale(33),
        fontSize: scale(36),
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: '400',
        zIndex: 2,
    },
    wrapDot: {
        flexDirection: 'row',
        alignSelf: 'center',  
    },
    dotActive: {
        margin: 1,
        width: 7,
        height: 7,
    },
    dot: {
        margin: 1,
        opacity: 0.27,
        size: 3,
        width: 7,
        height: 7,
    },
    skip: {
        width: scale(300),
        height: scale(60),
        borderRadius: scale(30),
        backgroundColor: "#2DB3EB",
        alignSelf: 'center',
        justifyContent: 'center',
    },
    skipText: {
        fontSize: scale(17),
        alignSelf: 'center',
    },
})