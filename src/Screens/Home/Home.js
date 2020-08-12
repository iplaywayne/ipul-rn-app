import React from 'react'
import {
  View, Button, SafeAreaView, ScrollView, StyleSheet, Image, StatusBar, Linking,
  Alert
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
import { Divider } from 'react-native-paper'
import InAppBrowser from 'react-native-inappbrowser-reborn'

import { Center, MiniCard, ExploreCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import MediaService from '../../utils/media/MediaService'
import SponsoredCard from '../../components/Ads/SponsoredCard'


async function openLink() {
  try {
    const url = 'https://www.zorei.co'
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#121212',
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'popover',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right'
        },
        headers: {
          'my-custom-header': 'my custom header value'
        }
      })
      // Alert.alert(JSON.stringify(result))
    }
    else Linking.openURL(url)
  } catch (error) {
    Alert.alert(error.message)
  }
}


function Home({ navigation }) {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { tracks } = storeState
  const { user } = authState
  const name = (user && user.name) ?? { name: '' }
  const mediaService = MediaService()
  const topRemixes = tracks.filter(trk => trk.genre.toString().toLowerCase().includes('r&'))
  const modalizeRef = React.useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  if (user && !('name' in user)) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
    <Text style={{ fontSize: 15 }}>We need to create your username to continue</Text>
  </View>

  if (!tracks) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
    <Text style={{ fontSize: 15 }}>We are waiting for tracks</Text>
  </View>


  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle='dark-content' />

      <View>
        <Text style={styles.title}>Welcome, {name}</Text>
      </View>

      <Divider style={{ marginBottom: 20 }} />

      <Text style={{ paddingTop: 5, paddingLeft: 15, paddingBottom: 10, fontWeight: '700' }}>Top Remixes</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15, flexDirection: 'row' }}>
        {tracks && tracks.filter(t => t.bio.toLowerCase().includes('remix')).map((itm, idx) => (
          <MiniCard key={idx} item={itm} />
        ))}
      </ScrollView>

      <Text style={{ paddingTop: 10, paddingLeft: 15, paddingBottom: 10, fontWeight: '700' }}>Top Hip Hop</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15, flexDirection: 'row' }}>
        {tracks && tracks.filter(t => t.genre.toLowerCase().includes('hip')).map((itm, idx) => (
          <MiniCard key={idx} item={itm} />
        ))}
      </ScrollView>

      <Text style={{ paddingTop: 10, paddingLeft: 15, paddingBottom: 10, fontWeight: '700' }}>Top R & B</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15, flexDirection: 'row' }}>
        {tracks && tracks.filter(t => t.genre.toLowerCase().includes('r&')).map((itm, idx) => (
          <MiniCard key={idx} item={itm} />
        ))}
      </ScrollView>

      <Text style={{ paddingTop: 10, paddingLeft: 15, paddingBottom: 10, fontWeight: '700' }}>Top Reggae</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15, flexDirection: 'row' }}>
        {tracks && tracks.filter(t => t.genre.toLowerCase().includes('regg')).map((itm, idx) => (
          <MiniCard key={idx} item={itm} />
        ))}
      </ScrollView>

      <Divider style={{ marginTop: 15 }} />

      <View style={{ flex: 1, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>

      <SponsoredCard onOpen={openLink} />
      </View>

      <View style={{ flex: 1, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
        {topRemixes.map((itm, idx) => (
          <ExploreCard key={idx} item={itm} />
        ))}
      </View>


      {/* <Text>{JSON.stringify(topRemixes, null, 2)}</Text> */}
      {/* <Button title='Sign Out' onPress={() => authDispatch.signOut()} /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 30,
    flex: 1,
    paddingBottom: 50
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 50,
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 150,
    width: 150,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 5
  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
  },
  miniCardText: {
    flex: 1
  }
})

export default Home
