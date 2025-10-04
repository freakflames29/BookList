import { AnimationObject } from 'lottie-react-native';
import { ImageRequireSource } from 'react-native';

export const imagePath = {
  signin: require('../assets/images/sign.jpg') as ImageRequireSource,
  krishna: require('../assets/images/krishna.jpeg') as ImageRequireSource,
  screw: require('../assets/images/screw.png') as ImageRequireSource,
  prabhu: require('../assets/images/signup.png') as ImageRequireSource,
  booklottie: require('../assets/lotties/Books.json') as | AnimationObject,
  booklottie2: require('../assets/lotties/book.json') as | AnimationObject,
};
