/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,

} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Routes from './src/routes/Routes';


function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    // <SafeAreaProvider>
      <SafeAreaView style={{flex:1}} >
      {/* <Routes/> */}
      </SafeAreaView>
    // </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
});

export default App;
