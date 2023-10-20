import LottieView from 'lottie-react-native';
import {Modal, StyleSheet, View, Text} from 'react-native';

const Loader = props => {
  return (
    <Modal transparent visible={props.visible}>
      <View style={styles.background}>
        <Lottie />
        <Text style={{fontWeight:'800',fontSize:24,lineHeight:24,color:'#FFFFFF',textAlign:'center'}}>
          Loading...
        </Text>
      </View>
    </Modal>
  );
};

const Lottie = () => {
  return (
    <LottieView
      style={{width: '100%', height: '50%'}}
      source={require('../assets/animation/loader.json')}
      autoPlay
    />
  );
};

export default Loader;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});