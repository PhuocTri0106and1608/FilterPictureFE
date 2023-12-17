import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import FONT_FAMILY from '../../constants/fonts';
import scale from '../../constants/responsive';
import { IC_Back } from '../../assets/icons';
import { IMG_Logo } from '../../assets/images';

const { width, height } = Dimensions.get('window');

const AboutScreen = (props) => {
  const logoSize = Math.min(width * 0.4, 150);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginLeft: scale(width * 0.05), marginTop: scale(height * 0.05), flexDirection: 'row' }}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F6FB',
  },
  title: {
    marginLeft: scale(width * 0.05),
    fontFamily: FONT_FAMILY.Title,
    fontSize: scale(32),
    lineHeight: scale(32),
    color: '#744ACC',
  },
  logo: {
    borderRadius: scale(360),
    alignSelf: 'center',
  },
  versionText: {
    marginVertical: scale(20),
    alignSelf: 'center',
    textAlign: 'justify',
    fontFamily: FONT_FAMILY.Body,
    fontSize: 20,
    color: '#744ACC',
  },
  bodyTextBox: {
    alignSelf: 'center',
    padding: 20,
  },
  bodyText: {
    textAlign: 'justify',
    fontSize: 16,
    fontFamily: FONT_FAMILY.Body,
    color: '#744ACC',
  },
});

export default AboutScreen;
