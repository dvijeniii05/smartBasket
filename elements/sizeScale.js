import {Dimensions, PixelRatio} from 'react-native';
const scaledWidth = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
const scaledHeight = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};
export {
  scaledHeight,
  scaledWidth
};

// 20 = 5% as a guide (4/1) FOR WIDTH
// 80 = 11.5% as a guide FOR HEIGHT
// fontSize 14 = 2% as a guide (7/1)