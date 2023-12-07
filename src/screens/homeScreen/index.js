import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import scale from '../../constants/responsive'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { IC_Back, IC_Camera, IC_Gallery } from '../../assets/icons';
import {resetResult } from '../../../redux/actions/resultActions';
import {useSelector,useDispatch } from 'react-redux';
import FONT_FAMILY from '../../constants/fonts';

const HomeScreen = (props) => {
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const results = useSelector(state => state.result);
    const {result} = results;
    console.log('result', JSON.stringify(results));

    const takePhoto = async () => {
      dispatch(resetResult());
      const result = await launchCamera({
        savePhotos: true,
        mediaType: 'photo',
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    };
    const pickPhoto = async () => {
      dispatch(resetResult());
      const result = await launchImageLibrary({
        savePhotos: true,
        mediaType: 'photo',
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    };
    useEffect(() => {
    }, [photo]);
    
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={{marginLeft:scale(20), marginTop:scale(40), flexDirection:'row'}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <IC_Back  fill={'#744ACC'}/>
          </TouchableOpacity>
          <Text style={styles.title}>Photo Transfer</Text>
        </View>
        <ScrollView style={{marginHorizontal:scale(30),marginTop: scale(20)}}>
                <TouchableOpacity style={styles.takePhotoButton} onPress={pickPhoto}>
                    <Text style={styles.buttonText}>Gallery</Text>
                    <IC_Gallery style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.takePhotoButton} onPress={takePhoto}>
                    <Text style={styles.buttonText}>Camera</Text>
                    <IC_Camera style={styles.icon}/>
                </TouchableOpacity>
                <View style={{flexDirection:'column',marginTop:scale(12)}}>
                    <Text style={{fontFamily: FONT_FAMILY.Tenor,fontSize:scale(20),lineHeight:scale(20),color:'#744ACC'}}>
                      Review your image:
                    </Text>
                    <View style={{borderWidth:5, borderColor:'#744ACC', justifyContent:'center',borderRadius:50,
                    alignSelf:'center',width:scale(300),height:scale(300),marginTop:scale(20)}}>
                      <Image source={{ uri: photo }} style={styles.photo} resizeMode='cover'/>
                    </View>
                    <>
                      <TouchableOpacity style={photo === null ? 
                      styles.viewResultButtonDisable : styles.viewResultButton} 
                      onPress={() => {photo === null ? null : props.navigation.navigate('ResultScreen', {photo:photo})}}>
                          <Text style={styles.buttonText}>Transfer Image</Text>
                      </TouchableOpacity>
                    </>
                </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#F0F6FB',
    },
    camera: {
        width: '100%',
        height: '80%',
      },
      photo: {
        width: '100%',
        height: '100%',
        borderRadius:44,
        justifyContent:'center',
        alignSelf:'center',
      },
    title: {
      marginLeft:scale(20),
      fontWeight:'700',
      fontFamily: FONT_FAMILY.Tenor,
      fontSize: scale(32),
      lineHeight:scale(32),
      color: '#744ACC',
    },
    takePhotoButton: {
        marginTop:scale(20),
        height:scale(70),
        paddingLeft:scale(30),
        justifyContent:'center',
        backgroundColor:'#744ACC',
        borderRadius:scale(20),
    },
    viewResultButton: {
      marginTop:scale(40),
      height:scale(70),
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#744ACC',
      borderRadius:scale(20),
    },
    viewResultButtonDisable: {
      marginTop:scale(40),
      height:scale(70),
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#808080',
      borderRadius:scale(20),
    },
    buttonText: {
        justifyContent:'center',
        fontFamily: FONT_FAMILY.Tenor,
        fontWeight:'500',
        fontSize: scale(20),
        lineHeight:scale(20),
        color: '#F0F6FB',
    },
    icon: {
        marginLeft: scale(250), 
        marginTop: scale(-22)
    },
})