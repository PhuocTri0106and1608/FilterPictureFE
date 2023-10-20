import { SafeAreaView, StyleSheet, Text, View,Image,ScrollView,TouchableOpacity,Platform ,
   ActivityIndicator} from 'react-native'
import React, { useState,useEffect } from 'react'
import scale from '../../constants/responsive'
import { IC_Back,IC_Delete } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../constants/loader';
import axios from 'axios'
import Message from '../../constants/errorMessage';
import { saveCezanne, saveMonet, saveUkiyoe, saveVangogh } from '../../../redux/actions/resultActions';


const ResultScreen = (props) => {
  const {photo} = props.route.params;
  const results = useSelector(state => state.result);
  // const {resultItems} = results;
  console.log('result', JSON.stringify(results));
  const [chosen, setChosen] = useState('');
  const [styleTittle, setStyleTittle] = useState();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(false);
  const dispatch = useDispatch();
  
  
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
      setVisible(true);
      setMessage('Request Failed');
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
          title={'ERROR'}
          message={message}
        />
        {loading && <Loader />}
          <View style={{marginLeft:scale(20), marginTop:scale(40), flexDirection:'row'}}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <IC_Back  fill={'#744ACC'}/>
            </TouchableOpacity>
            <Text style={styles.title}>Photo Transfer</Text>
          </View>
          <ScrollView>        
            <View style={{flexDirection:'column',marginTop:scale(12)}}>
                <Text style={{fontWeight:'600',fontSize:scale(20),lineHeight:scale(20),color:'#744ACC',marginLeft:scale(20)}}>
                  Your image:
                </Text>
                <View style={{borderWidth:5, borderColor:'#744ACC', justifyContent:'center',borderRadius:50,
                alignSelf:'center',width:scale(300),height:scale(300),marginTop:scale(20)}}>
                  <Image source={{ uri: photo }} style={styles.photo} resizeMode='cover' />
                </View>
                {chosen === "" ? (
                  <Text style={{fontWeight:'800',fontSize:scale(28),lineHeight:scale(24),color:'#744ACC',textAlign:'center',marginTop:scale(140)}}>
                    Let's choose style!
                  </Text>
                ):(<>
                  <Text style={{fontWeight:'600',fontSize:scale(20),lineHeight:scale(20),color:'#744ACC',marginLeft:scale(20),marginTop:scale(20)}}>
                    {styleTittle} image:
                  </Text>
                  <TouchableOpacity onPress={() => setZoom(true)} 
                  style={{borderWidth:5, borderColor:'#744ACC', justifyContent:'center',borderRadius:50,
                alignSelf:'center',width:scale(300),height:scale(300),marginTop:scale(20)}}>
                    <Image source={{ uri: chosen}} style={styles.photo} resizeMode='cover'/>
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
                  console.log('asfsdf', JSON.stringify(chosen)),
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
    marginLeft:scale(20),
    fontWeight:'700',
    fontSize: scale(32),
    lineHeight:scale(32),
    color: '#744ACC',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius:44,
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
    fontSize: scale(17),
  },
  textTabChosen: {
    color: 'white',
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