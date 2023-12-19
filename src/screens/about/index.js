import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import FONT_FAMILY from '../../constants/fonts';
import scale from '../../constants/responsive';
import { IC_Back } from '../../assets/icons';
import { IMG_Logo } from '../../assets/images';

const { width, height } = Dimensions.get('window');

const AboutScreen = (props) => {
  const logoSize = Math.min(width * 0.6, 160);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: width*0.86, alignSelf:'center'}}>
        <View style={{width: width*0.38,justifyContent: 'space-between',
        alignSelf: 'flex-start', marginTop: height * 0.05, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <IC_Back />
            </TouchableOpacity>
            <Text style={styles.title}>About</Text>
        </View>

        <View style={styles.bodyTextBox}>
          <Image source={IMG_Logo} style={[styles.logo, { width: logoSize, height: logoSize }]} />
          <Text numberOfLines={1} style={styles.versionText}>
            Version 1.23.1
          </Text>
          <Text numberOfLines={4} style={styles.bodyText}>
            {'  '}
            Photo Transfer is a project of Thanh Thao and Phuoc Tri which was done in 3 months for Project 1 of University
            of Information Technology.
          </Text>
          <Text numberOfLines={8} style={styles.bodyText}>
            {'  '}
            The purpose of the application is to help convert photos into painter-style paintings for reference and to
            transform photos in a new and more artistic way. In this application, we provide four styles of the following
            four artists: Monet, Van Gogh, Ukiyoe, and Cezanne.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  logo: {
    borderRadius: 360,
    alignSelf: 'center',
  },
  versionText: {
    marginVertical: height*0.03,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.Body,
    fontSize: 24,
    color: '#744ACC',
  },
  bodyTextBox: {
    marginTop: height * 0.05,
    alignSelf: 'center',
  },
  bodyText: {
    textAlign: 'justify',
    fontSize: 18,
    fontFamily: FONT_FAMILY.Body,
    color: '#744ACC',
  },
});

export default AboutScreen;
