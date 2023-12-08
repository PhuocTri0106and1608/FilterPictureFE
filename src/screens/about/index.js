import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native'
import FONT_FAMILY from '../../constants/fonts'
import scale from '../../constants/responsive'
import { IC_Back } from '../../assets/icons'
import { IMG_Logo } from '../../assets/images'


const AboutScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{marginLeft:scale(20), marginTop:scale(40), flexDirection:'row'}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <IC_Back/>
          </TouchableOpacity>
          <Text style={styles.title}>About</Text>
        </View>
        
        
        <View style={styles.bodyTextBox}>
            <Image source={IMG_Logo} style={styles.logo}/>
            <Text numberOfLines={1} style={styles.versionText}>
                Version 1.23.1
            </Text>
            <Text numberOfLines={1} style={styles.bodyText}/>
            <Text numberOfLines={4} style={styles.bodyText}>
                {'  '}
                Photo Transfer is a project of Thanh Thao and Phuoc Tri which was 
                done in 3 months for Project 1 of University of Information Technology. 
            </Text>
            <Text numberOfLines={1} style={styles.bodyText}/>
            <Text numberOfLines={8} style={styles.bodyText}>
                {'  '}
                The purpose of the application is to help convert photos into painter-style paintings
                 for reference and to transform photos in a new and more artistic way. In this application,
                 we provide four styles of the following four artists: Monet, Van Gogh, Ukiyoe, and Cezanne.
            </Text>
        </View>
        
    </SafeAreaView>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#F0F6FB',
    },
    title: {
        marginLeft:scale(20),
        fontWeight:'400',
        fontFamily: FONT_FAMILY.Tenor,
        fontSize: scale(32),
        lineHeight:scale(32),
        color: '#744ACC',
      },
    logo: {
        borderRadius: scale(360),
        width: scale(150),
        height: scale(150),
        alignSelf: 'center'
    },
    versionText: {
        marginVertical:scale(20),
        alignSelf: 'center',
        textAlign: 'justify',
        fontFamily: FONT_FAMILY.Tenor,
        fontSize: 20,
        fontWeight: '500',
        color: '#744ACC',
    },
    bodyTextBox: {
        alignSelf: 'center',
        marginTop: scale(20),
        padding: 20,
    },
    bodyText: {
        textAlign: 'justify',
        fontSize: 16,
        fontFamily: FONT_FAMILY.Tenor,
        fontWeight: '400',
        color: '#744ACC',
    },
})