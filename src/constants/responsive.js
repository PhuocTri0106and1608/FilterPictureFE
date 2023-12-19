const { width: screenWidth, height: designHeight } = Dimensions.get('window');
import {Dimensions} from 'react-native';

export default function scale(number) {
  let scaleNumber;
  const currentDeviceHeight = Dimensions.get('window').height;
  scaleNumber = (number / designHeight) * currentDeviceHeight;
  return scaleNumber;
}
