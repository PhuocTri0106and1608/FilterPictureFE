import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
  } from 'react-native';
  import React from 'react';
  import {IMG_Real, IMG_Vangogh, IMG_Monet} from '../../assets/images';
import scale from '../../constants/responsive';
  import SwiperFlatList from 'react-native-swiper-flatlist';
  import FONT_FAMILY from '../../constants/fonts';
  
  const {width: screenWidth} = Dimensions.get('window');
  
  const HotNew = (props) => {
    const views = [
      {
        source: IMG_Real,
        text: 'Make your photos \ndifferent.',
        id: 0,
      },
      {
        source: IMG_Monet,
        text: 'Choose your photo  \nand the artist style',
        id: 1,
      },
      {
        source: IMG_Vangogh,
        text: 'Download it to get a  \nunique painting',
        id: 2,
      },
    ];
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.swiper}>
          <SwiperFlatList
            showPagination
            paginationStyle={styles.wrapDot}
            paginationStyleItemActive={styles.dotActive}
            paginationStyleItemInactive={styles.dot}
            data={views}
            renderItem={({item}) => (
              <View key={item.id} style={{width: screenWidth, height: '110%'}}>
                <ImageBackground source={item.source} style={styles.image}>
                  <Text style={styles.text}>{item.text}</Text>
                  <Text style={styles.subText}>{item.subText}</Text>
                  <TouchableOpacity
                    style={styles.skip} onPress={() => props.navigation.navigate('HomeScreen')}>
                    <Text style={styles.skipText}>Skip</Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  };
  
  export default HotNew;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#EDD1FF",
    },
    swiper: {
      height: '100%',
      width: '100%',
      //justifyContent: 'center',
    },
    image: {
        marginTop: scale(120),
        marginLeft: scale(28),
        //borderColor: "#00000",
        alignSelf: 'center',
        alignContent: 'center',
        width: "91.5%",
        height: "68%",
    },
    text: {
      height: scale(100),
      marginTop: scale(500),
      fontSize: scale(28),
<<<<<<< HEAD
      //fontWeight: '700',
=======
      fontWeight: '500',
>>>>>>> 3d4f9cff0423bc4e92583d495334ed76f0b42ae3
      marginLeft: scale(10),
      color: '#000000',
      justifyContent: 'center',
      fontFamily: FONT_FAMILY.Body,
      //fontWeight: "600",
    },
    
    wrapDot: {
      width: '20%',
      top: '66%',
      left: '40%',
    },
    dotActive: {
      margin: scale(1),
      backgroundColor: '#2DB3EB',
      width: scale(14),
      height: scale(3),
      borderRadius: 10,
    },
    dot: {
      margin: scale(1),
      //backgroundColor: '#000000',
      size: 4,
      width: scale(3),
      height: scale(3),
    },
    skip: {
      backgroundColor: '#2DB3EB',
    },
    skipText: {
      //fontWeight: '400',
      position: 'absolute',
      bottom: scale(20),
      right: scale(20),
      fontSize: scale(14),
      // alignSelf: 'center',
      color: '#000000',
      fontFamily: FONT_FAMILY.Body,
    },
  });