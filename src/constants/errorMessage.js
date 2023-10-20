import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import scale from './responsive';
import UnderLine from './underline';

const Message = props => {
  // take in visible(state), title, message, click cancel
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Modal transparent visible={props.visible}>
      <View style={styles.background}>
        <View style={styles.noticeBox}>
          <UnderLine
            text={props.title}
            textStyle={[
              styles.titleText,
              props.title === 'Error' && {color: 'red', opacity: 0.7},
            ]}
            style={{
              color:
                props.title === 'Error' ? 'red' : 'black',
            }}
            lineColor={{
              backgroundColor:
                props.title === 'Error' ? 'red' : 'black',
            }}></UnderLine>
          <View style={styles.noticeMessage}>
            <View
              style={{
                width: '100%',
                height: '65%',
                justifyContent: 'center',
                marginTop: scale(-20),
              }}>
              <Text
                style={[
                  styles.messageText,
                  props.fail ? {color: 'red'} : null,
                ]}
                numberOfLines={5}>
                {props.message}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonPosition}
              onPress={props.clickCancel}>
              <View
                style={[
                  styles.buttonBox,
                  props.title === 'Error'
                    ? {backgroundColor: 'red', opacity: 0.8}
                    : null,
                ]}>
                <Text style={styles.buttonText}>
                  {props.buttonText ? props.buttonText : 'OK'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Message;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeBox: {
    width: scale(315),
    height: scale(322),
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  noticeTitle: {
    backgroundColor: 'black',
    width: '100%',
    paddingHorizontal: scale(30),
    height: scale(66),
  },
  titleText: {
    color: 'black',
    fontSize: scale(24),
    alignSelf: 'center',
  },
  noticeMessage: {
    flex: 1,
    padding: scale(20),
  },
  messageText: {
    color: 'black',
    fontSize: scale(20),
    textAlign: 'center',
  },
  buttonPosition: {
    marginTop: scale(20),
    alignSelf: 'center',
  },
  buttonBox: {
    backgroundColor: 'black',
    height: scale(53),
    width: scale(278),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
  },
});
