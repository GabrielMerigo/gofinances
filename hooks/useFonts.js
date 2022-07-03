import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    Poppins_medium: require('../assets/fonts/Poppins-Medium.ttf'),
    Poppins_regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Poppins_bold: require('../assets/fonts/Poppins-Bold.ttf'),
  });