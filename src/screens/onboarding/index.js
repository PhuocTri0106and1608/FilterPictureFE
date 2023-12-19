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
import { IMG_Real, IMG_Vangogh, IMG_Monet } from '../../assets/images';
import scale from '../../constants/responsive';
import SwiperFlatList from 'react-native-swiper-flatlist';
import FONT_FAMILY from '../../constants/fonts';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
          renderItem={({ item }) => (
            <View key={item.id} style={{ width: screenWidth}}>
              <Image source={item.source} style={styles.image}/>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.skip} onPress={() => props.navigation.navigate('HomeScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HotNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDD1FF',
  },
  swiper: {
    height: '100%',
    width: '100%',
    alignSelf:'center',
    borderWidth: 1,
  },
  image: {
    marginTop: screenHeight * 0.1,
    alignSelf: 'center',
    width: screenWidth * 0.88,
    height: screenHeight * 0.54,
  },
  text: {
    marginTop: screenHeight * 0.07,
    marginLeft: screenWidth * 0.07,
    fontSize: screenWidth * 0.07,
    fontWeight: '500',
    color: '#000000',
    fontFamily: FONT_FAMILY.Body,
  },
  wrapDot: {
    width: screenWidth * 0.2,
    top: screenHeight * 0.66,
    alignSelf:'center'
  },
  dotActive: {
    margin: scale(1),
    backgroundColor: '#2DB3EB',
    width: screenWidth * 0.07,
    height: scale(3),
    borderRadius: scale(10),
  },
  dot: {
    margin: scale(1),
    size: 4,
    width: scale(3),
    height: scale(3),
  },
  skip: {
    alignSelf:'flex-end',
    marginRight: screenWidth * 0.1,
    marginBottom: screenHeight * 0.07
  },
  skipText: {
    fontSize: screenHeight * 0.018,
    color: '#000000',
    fontFamily: FONT_FAMILY.Body,
  },
});
