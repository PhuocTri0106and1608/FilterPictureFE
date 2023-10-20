const designWidth = 375;
import {Dimensions} from 'react-native';

export default function scale(number) {
  let scaleNumber;
  const currentDeviceWidth = Dimensions.get('window').width;
  scaleNumber = (number / designWidth) * currentDeviceWidth;
  return scaleNumber;
}
