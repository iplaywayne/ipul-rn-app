import React from 'react'
import {
  View, Button as Btn, SafeAreaView, ScrollView, StyleSheet, Image, StatusBar, Linking,
  Alert, TouchableOpacity
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
import { Divider } from 'react-native-paper'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { Shadow } from 'react-native-neomorph-shadows';
import Popover from 'react-native-popover-view';
import Spinner from 'react-native-spinkit'
import Button from 'react-native-button'


import { Center, MiniCard, ExploreCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import MediaService from '../../utils/media/MediaService'
import SponsoredCard from '../../components/Ads/SponsoredCard'
import { openLink } from '../../utils/functions'


function Home({ navigation }) {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { tracks } = storeState
  const { user } = authState
  const name = user && user.name
  const mediaService = MediaService()
  const topRemixes = tracks.filter(trk => trk.genre.toString().toLowerCase().includes('r&'))
  const modalizeRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true)

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const MediaRow = ({ title, query, tracks }) => (
    <View>
      <Text style={{ paddingTop: 5, paddingLeft: 15, paddingBottom: 10, fontWeight: '700' }}>{title}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15, flexDirection: 'row' }}>

        {tracks && tracks.filter(t => JSON.stringify(t).toLowerCase().includes(query)).map((itm, idx) => (
          <MiniCard key={idx} item={itm} />
        ))}
      </ScrollView>
    </View>
  )

  React.useEffect(() => {
    setTimeout(() => {
      if (tracks.length) {
        mediaService.setup()
        setLoading(false)
      }
    }, 1500)

  }, [tracks])

  if (user && !('name' in user)) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
    <Text style={{ fontSize: 15 }}>We need to create your username to continue</Text>
  </View>

  if (loading) return <Center><Spinner type='Wave' /></Center>

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle='dark-content' />

      <View>
        <Text style={styles.title}>Welcome, {name}</Text>
      </View>

      <Divider style={{ marginBottom: 20 }} />

      <MediaRow title='Top Remixes' query='rem' tracks={tracks} />
      <MediaRow title='Top Hip Hop' query='hip' tracks={tracks} />
      <MediaRow title='Top R & B' query='r&' tracks={tracks} />
      <MediaRow title='Top Reggae' query='regg' tracks={tracks} />

      <Divider style={{ marginTop: 15, marginBottom: 30 }} />

      <View style={{
        flex: 1, marginBottom: 20,
        justifyContent: 'center', alignItems: 'center'
      }}>

        <SponsoredCard
          title={'Stock up on your travel essentials!'}
          caption={'Shop Zorei'}
          location={'Zorei.co'}
          image={'https://iplayulisten.com/zorei-logo.png'}
          avatar={'https://iplayulisten.com/zorei-logo.png'}
          onOpen={() => openLink('https://www.zorei.co')} />
      </View>
      <Button onPress={() => {
        setTimeout(() => {
          authDispatch.signOut()
        }, 1000)
      }}
        style={{ fontSize: 15 }}>
        Sign Out
      </Button>

      <View style={{ flex: 1, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
        {topRemixes.map((itm, idx) => (
          <ExploreCard key={idx} item={itm} />
        ))}
      </View>

      {/* <Text>{JSON.stringify(topRemixes, null, 2)}</Text> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 30,
    flex: 1,
    paddingBottom: 50,
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
