import { SafeAreaView, StyleSheet, Text, View,Image,
  ScrollView,TouchableOpacity,PermissionsAndroid, Platform} from 'react-native'
import React, { useState,useEffect, useRef } from 'react'
import scale from '../../constants/responsive'
import { IC_Back,IC_Delete } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../constants/loader';
import axios from 'axios'
import Message from '../../constants/message';
import { saveCezanne, saveMonet, saveUkiyoe, saveVangogh } from '../../../redux/actions/resultActions';
import Share from 'react-native-share';
import ViewShot, { captureRef} from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import FONT_FAMILY from '../../constants/fonts';
import { IMG_HLogo } from '../../assets/images';

const ResultScreen = (props) => {
  const {photo} = props.route.params;
  const results = useSelector(state => state.result);
  // const {resultItems} = results;
  console.log('result', JSON.stringify(results));
  const [chosen, setChosen] = useState('');
  const [styleTittle, setStyleTittle] = useState();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('Error');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(false);
  const dispatch = useDispatch();
  const viewRef = useRef();
  
  const shareImage = async () => {
    try {
      
      // capture component 
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      // share
      const shareResponse = await Share.open({url: uri});
    } catch (error) {
      console.log('error', error);
    }
  };
  const checkPermission = async () => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };


  const downloadImage = () => {
    try {
      let date = new Date();
      var Base64Code = chosen.split("data:image/png;base64,"); //base64Image is my image base64 string
      const dirs = RNFetchBlob.fs.dirs;
      var path = dirs.DCIMDir + `/image_${Math.floor(date.getTime() + date.getSeconds() / 2)}.png`;

      RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64')
      .then((res) => {
        console.log("File : ", res),
        setTitle("Successfully");
        setVisible(true);
        setMessage('Save successfully!');
      });
    } catch (error) {
      console.error('An error occurred during image download:', error);
      setTitle("Error");
      setVisible(true);
      setMessage('Failed to download the image.');
    }
  };
  

  
  const Transfer = async (style) => {
    setStyleTittle(style);
    const formData = new FormData();
    formData.append(`upload_${style}`, {
      name: new Date() + `_image`,
      uri: photo,
      type: 'image/png',
    })
    setLoading(true);
    console.log(formData);
    try {
      const response = await axios.post(`https://filterpicturebe.onrender.com/${style}?`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('success', JSON.stringify(response.data));
      switch(style){
        case "Monet": 
          dispatch(saveMonet(response?.data.image_url));
          break;
        case "Cezanne": 
          dispatch(saveCezanne(response?.data.image_url));
          break;
        case "Vangogh": 
          dispatch(saveVangogh(response?.data.image_url));
          break;
        case "Ukiyoe": 
          dispatch(saveUkiyoe(response?.data.image_url));
          break;
        default:
          break;
      }
      setChosen(response?.data.image_url);
      setLoading(false);
      console.log('chosenA', JSON.stringify(chosen))
      
    } catch (err) {
      setLoading(false);
      setTitle("Error");
      setVisible(true);
      setMessage('Request error');
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    console.log('chosen', JSON.stringify(chosen))
  }, [chosen]);
  
  
  return (
    <SafeAreaView style={styles.container}>
      {zoom ? (
        <View style={styles.imgContainer}>
          <TouchableOpacity
            onPress={() => setZoom(false)}
            style={{alignSelf: 'flex-end', padding: scale(10)}}>
            <IC_Delete />
          </TouchableOpacity>
          <Image
            source={{uri: chosen}}
            style={styles.img}
            resizeMode="contain"
          />
        </View>
      ):(
        <>
        <Message
          visible={visible}
          clickCancel={() => { setVisible(false) }}
          title={title}
          message={message}
        />
        {loading && <Loader />}
          <View style={{marginLeft:scale(20), marginTop:scale(30), flexDirection:'row'}}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <IC_Back stroke={'#744ACC'}/>
            </TouchableOpacity>
            <Image style={styles.title} source={IMG_HLogo}/>
          </View>
          <ScrollView>        
            <View style={{flexDirection:'column',marginTop:scale(20)}}>
                <Text style={{fontFamily: FONT_FAMILY.Body,fontSize:scale(20),lineHeight:scale(20),color:'#744ACC',marginLeft:scale(20)}}>
                  Your image:
                </Text>
                <View style={{borderWidth:2, borderColor:'#744ACC', justifyContent:'center',borderRadius:30,
                alignSelf:'center',width:scale(300),height:scale(300),marginTop:scale(20)}}>
                  <Image source={{ uri: photo }} style={styles.photo} resizeMode='cover' />
                </View>
                {chosen === "" ? (
                  <Text style={{fontFamily: FONT_FAMILY.Body,fontSize:scale(28),lineHeight:scale(24),color:'#744ACC',textAlign:'center',marginTop:scale(140)}}>
                    Let's choose style!
                  </Text>
                ):(<>
                  <Text style={{fontFamily: FONT_FAMILY.Body,fontSize:scale(20),lineHeight:scale(20),color:'#744ACC',marginLeft:scale(20),marginTop:scale(20)}}>
                    {styleTittle} image:
                  </Text>
                  <TouchableOpacity onPress={() => setZoom(true)}
                  style={{borderWidth:2, borderColor:'#744ACC', justifyContent:'center',borderRadius:30,
                alignSelf:'center',width:scale(300),height:scale(300),marginTop:scale(20)}}>
                    <ViewShot ref={viewRef}>
                      <Image source={{ uri: chosen}} style={styles.photo} resizeMode='cover'/>
                    </ViewShot>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    marginTop:scale(20),
                    width: scale(300),
                    height:scale(50),
                    alignItems:'center',
                    alignSelf:'center',
                    justifyContent:'center',
                    backgroundColor:'#744ACC',
                    borderRadius:scale(20),
                  }} onPress={checkPermission}>
                    <Text style={{
                    justifyContent:'center',
                    fontWeight:'500',
                    fontFamily: FONT_FAMILY.Body,
                    fontSize: scale(20),
                    lineHeight:scale(20),
                    color:"#F0F6FB"}}>
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    marginTop:scale(20),
                    width: scale(300),
                    height:scale(50),
                    alignItems:'center',
                    alignSelf:'center',
                    justifyContent:'center',
                    backgroundColor:'#744ACC',
                    borderRadius:scale(20),
                  }} onPress={shareImage}>
                    <Text style={{
                    justifyContent:'center',
                    fontWeight:'500',
                    fontFamily: FONT_FAMILY.Body,
                    fontSize: scale(20),
                    lineHeight:scale(20),
                    color:"#F0F6FB"}}>
                      Share
                    </Text>
                  </TouchableOpacity>
                </>)}
            </View>
          </ScrollView>
          {/* Bottom Tab */}
          <>
            <View style={styles.bottomTabs}>
              <TouchableOpacity
                style={styleTittle == 'Cezanne' ? styles.touchTabChosen : styles.touchTab}
                onPress={() => {
                  results.Cezanne_result?.result === undefined ? Transfer('Cezanne') : null,
                  setChosen(results.Cezanne_result?.result),
                  setStyleTittle('Cezanne')
                }}>
                <Text
                  style={styleTittle == 'Cezanne' ? styles.textTabChosen : styles.textTab}>
                  Cezanne
                </Text>
              </TouchableOpacity>
              {/* ------------------ */}
              <TouchableOpacity
                style={styleTittle == 'Monet' ? styles.touchTabChosen : styles.touchTab}
                onPress={() => {
                  results.Monet_result?.result === undefined ? Transfer('Monet') : null,
                  setChosen(results.Monet_result?.result),
                  setStyleTittle('Monet')
                }}>
                <Text
                  style={styleTittle == 'Monet' ? styles.textTabChosen : styles.textTab}>
                  Monet
                </Text>
              </TouchableOpacity>
              {/* ------------------ */}
              <TouchableOpacity
                style={styleTittle == 'Ukiyoe' ? styles.touchTabChosen : styles.touchTab}
                onPress={() => {
                  results.Ukiyoe_result?.result === undefined ? Transfer('Ukiyoe') : null,
                  setChosen(results.Ukiyoe_result?.result),
                  setStyleTittle('Ukiyoe')
                }}>
                <Text
                  style={styleTittle == 'Ukiyoe' ? styles.textTabChosen : styles.textTab}>
                  Ukiyoe
                </Text>
              </TouchableOpacity>
              {/* ------------------ */}
              <TouchableOpacity
                style={styleTittle == 'Vangogh' ? styles.touchTabChosen : styles.touchTab}
                onPress={() => {
                  results.Vangogh_result?.result === undefined ? Transfer('Vangogh') : null,
                  setChosen(results.Vangogh_result?.result),
                  setStyleTittle('Vangogh')
                }}>
                <Text
                  style={styleTittle == 'Vangogh' ? styles.textTabChosen : styles.textTab}>
                  Vangogh
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </>
      )}
    </SafeAreaView>
  )
}

export default ResultScreen

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#F0F6FB',
  },
  title: {
    //alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(-20),
    marginLeft:scale(40),
    width: "90%",
    height: "280%",
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius:28,
    justifyContent:'center',
    alignSelf:'center',
  },
  bottomTabs: {
    flexDirection: 'row',
    width: '95%',
    height: 50,
    borderRadius: 50,
    alignSelf:'center',
    alignContent: 'space-between',
    marginTop: scale(20),
    bottom: 5,
    backgroundColor: 'white',
  },
  touchTab: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
  },
  touchTabChosen: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 50,
    backgroundColor: '#744ACC',
  },
  textTab: {
    color: '#744ACC',
    fontFamily: FONT_FAMILY.Body,
    fontSize: scale(17),
  },
  textTabChosen: {
    color: 'white',
    fontFamily: FONT_FAMILY.Body,
    fontSize: scale(17),
  },
  imgContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  }
})