import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, {useState} from 'react'
import scale from '../../constants/responsive'
import { IC_Back} from '../../assets/icons';
import FONT_FAMILY from '../../constants/fonts';
import { IMG_HLogo } from '../../assets/images';
import Message from '../../constants/message';

const SettingScreen = (props) => {
    const [title, setTitle] = useState('Error');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const handleButtonPress = () => {
        setTitle("Copy link to share")
        setVisible(true);
        setMessage('Link');   
    }
    const handleButtonPress1 = () => {
        setTitle("Send mail to")
        setVisible(true);
        setMessage('utrgk21.29@gmail.com');   
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={{marginLeft:scale(20), marginTop:scale(40), flexDirection:'row'}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <IC_Back/>
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

            <TouchableOpacity style={styles.lastButton} onPress={handleButtonPress1}>
                <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
        </View>
        <Message
          visible={visible}
          clickCancel={() => { setVisible(false) }}
          title={title}
          message={message}
        />
    </SafeAreaView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#F0F6FB',
    },
    title: {
        marginLeft:scale(20),
        // fontWeight:'400',
        fontFamily: FONT_FAMILY.Title,
        fontSize: scale(32),
        lineHeight:scale(32),
        color: '#744ACC',
      },
    frame: {
        top: scale(20),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: scale(20),
        marginHorizontal:scale(30),
        marginTop: scale(20)
    },
    takePhotoButton: {
        height:scale(70),
        paddingLeft:scale(30),
        justifyContent:'center',
        borderRadius:scale(20),
        borderBottomWidth: 1,
    },
    lastButton: {
        height:scale(70),
        paddingLeft:scale(30),
        justifyContent:'center',
        borderRadius:scale(20),
    },
    buttonText: {
        justifyContent: 'center',
        fontFamily: FONT_FAMILY.Body,
        fontSize: scale(20),
        color: '#000000',
      },
      icon: {
        marginLeft: scale(230), 
        marginTop: scale(-22)
    },
})