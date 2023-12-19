import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { IC_Back } from '../../assets/icons';
import FONT_FAMILY from '../../constants/fonts';
import Message from '../../constants/message';

const { width, height } = Dimensions.get('window');
const SettingScreen = (props) => {
    const [title, setTitle] = useState('Error');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const handleButtonPress = () => {
        setTitle("Copied link to share")
        setVisible(true);
        Clipboard.setString('https://play.google.com/store/apps/details?id=com.filterpicturern&pcampaignid=web_share');
        setMessage('https://play.google.com/store/apps/details?id=com.filterpicturern&pcampaignid=web_share');   
    }
    const handleButtonPress1 = () => {
        setTitle("Send mail to")
        setVisible(true);
        setMessage('utrgk21.29@gmail.com');   
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: width*0.86, alignSelf:'center'}}>
        <View style={{width: width*0.45,justifyContent: 'space-between',
        alignSelf: 'flex-start', marginTop: height * 0.05, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <IC_Back />
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.frame}>
            <TouchableOpacity style={styles.takePhotoButton} onPress={() => props.navigation.navigate('AboutScreen')}>
                <Text style={styles.buttonText}>About Photo Transfer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.takePhotoButton} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>Share Photo Transfer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpButton} onPress={handleButtonPress1}>
                <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
        </View>
        <Message
            visible={visible}
            clickCancel={() => { setVisible(false) }}
            title={title}
            message={message}
        />
      </View>
    </SafeAreaView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F6FB',
  },
  title: {
      fontFamily: FONT_FAMILY.Title,
      fontSize: 32,
      lineHeight: 32,
      color: '#744ACC',
  },
  frame: {
      marginTop: height*0.05,
      height: height*0.3,
      gap: height*0.004,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      alignItems:'center',
      borderRadius: 20,
  },
  takePhotoButton: {
    height: '30%',
    width: '85%',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  helpButton: {
    height: '27%',
    width: '85%',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONT_FAMILY.Body,
    fontSize: 20,
    color: '#000000',
  },
})