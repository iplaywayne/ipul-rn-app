import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, NativeModules, Button
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios'
import { REACT_APP_ADMIN } from 'react-native-dotenv'

const App: () => React$Node = () => {
  const [data, setData] = React.useState('Loading . .')
  
  React.useEffect(() => {
    (async function () {
      const { data } = await axios.post('https://www.iplayulisten.com/api/products')
      setData(data)
    })()
  }, [])

  const getModules = React.useCallback(() => {
    const RNHello = NativeModules.RNHello
    console.log(REACT_APP_ADMIN)
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Text>{JSON.stringify(data, null, 2)}</Text>
          <Button title='Get Modules' onPress={getModules} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
