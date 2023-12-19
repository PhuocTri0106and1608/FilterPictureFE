import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native'
import React,{useEffect, useState} from 'react'
import scale from '../../constants/responsive'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { IC_Back, IC_Camera, IC_Gallery, IC_Setting } from '../../assets/icons';
import {resetResult } from '../../../redux/actions/resultActions';
import {useSelector,useDispatch } from 'react-redux';
import FONT_FAMILY from '../../constants/fonts';
import { IMG_HLogo } from '../../assets/images';
import Message from '../../constants/message';

const { width, height } = Dimensions.get('window');

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
    const [title, setTitle] = useState('Error');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const handleButtonPress = () => {
      if(photo === null){

        setTitle("Alert!")
        setVisible(true);
        setMessage('Please upload a photo!');   
      }
      else {
        props.navigation.navigate('ResultScreen', { photo: photo });
      }
    }
    //style={{marginLeft: scale(80), marginTop:scale(5), flexDirection:'row'}}
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Image style={{ width: '100%', height: '100%' }} resizeMode='contain' source={IMG_HLogo} />
        </View>
        <ScrollView style={{ alignSelf: 'center'}}>
                <TouchableOpacity style={styles.takePhotoButton} onPress={pickPhoto}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Gallery</Text>
                        <IC_Gallery style={styles.icon}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.takePhotoButton} onPress={takePhoto}>
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Camera</Text>
                    <IC_Camera style={styles.icon}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.takePhotoButton} onPress={() => props.navigation.navigate('SettingScreen')}>
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Settings</Text>
                    <IC_Setting style={styles.icon}/>
                  </View>
                </TouchableOpacity>
                <View style={{flexDirection:'column', marginTop: height * 0.03}}>
                    <Text style={{fontFamily: FONT_FAMILY.Body,fontSize:20,lineHeight:20,color:'#744ACC'}}>
                      Review your image:
                    </Text>
                    <View style={{borderWidth:5, borderColor:'#744ACC', justifyContent:'center',borderRadius:33,
                alignSelf:'center',width:width*0.8,height:height*0.36,marginTop:height*0.025}}>
                      <Image source={{ uri: photo }} style={styles.photo} resizeMode='cover'/>
                    </View>
                    <>
                      <TouchableOpacity style={styles.viewResultButton} 
                      onPress={handleButtonPress}>
                          <Text style={styles.buttonText}>Transfer Image</Text>
                      </TouchableOpacity>
                      <Message
                        visible={visible}
                        clickCancel={() => { setVisible(false) }}
                        title={title}
                        message={message}
                      />
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
      height:'100%',
      borderRadius: 28,
      alignSelf: 'center',
    },
    logo: {
      marginTop: height * 0.02,
      marginLeft: width * 0.16,
      alignSelf: 'center', 
      width: width * 1, 
      height: height * 0.1
    },
    takePhotoButton: {
        marginTop:height * 0.015,
        height:scale(70),
        paddingLeft:30,
        flex: 1,
        justifyContent:'center',
        backgroundColor:'#744ACC',
        borderRadius:20,
    },
    viewResultButton: {
      marginTop:height * 0.02,
      height:scale(70),
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#744ACC',
      borderRadius:20,
    },
    buttonContent: {
      width: '100%',
      gap: width * 0.4,
      flexDirection: 'row',
    },
    buttonText: {
      fontFamily: FONT_FAMILY.Body,
      fontSize: 20,
      color: '#F0F6FB',
    },
    icon: {
        alignSelf:'flex-end',
    },
})