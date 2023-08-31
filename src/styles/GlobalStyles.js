import {StyleSheet} from 'react-native';
import Colors from './Colors';

const GlobalStyles = StyleSheet.create({
  textBold: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  textSemiBold: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  textNormal: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
  textButton: {
    fontSize: 14,
    color: Colors.Secondary500,
    fontWeight: '600',
  },
});

export default GlobalStyles;
