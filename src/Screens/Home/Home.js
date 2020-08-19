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
import TrackService from '../../utils/media/TrackService'
import SponsoredCard from '../../components/Ads/SponsoredCard'
import { openLink } from '../../utils/functions'
import Camera from '../../components/Camera/Camera'
import { ErrorBoundary } from '../../components'
import PostService from '../../utils/post/PostService'
import PostCard from '../../components/Post/PostCard'


function Home(props) {
  const { navigation } = props
  const [storeState, storeDispatch] = useStore()
  const { user, isAdmin, tracks } = storeState
  const name = user && user.name
  const trackService = TrackService()
  const topRemixes = tracks && tracks.filter(trk => JSON.stringify(trk).toLowerCase().includes('s')).slice(0, 11)
  const modalizeRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true)
  const [globalPosts, setGlobalPosts] = React.useState(null)

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
    PostService.getGlobalPosts(posts => {
      setGlobalPosts(posts)
    })
    setTimeout(() => {
      if (tracks.length) {
        trackService.setup()
        setLoading(false)
      }
    }, 1000)
  }, [tracks])


  if (loading) return <Center><Spinner type='Wave' /></Center>

  const HomeHeader = () => (
    <View>
      <Text style={styles.title}>
        {isAdmin ? 'Hi Admin' : 'Welcome'}, {name}
      </Text>
    </View>
  )

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      <ErrorBoundary caller='Home Header'>
        <HomeHeader />
      </ErrorBoundary>

      <Divider style={{ marginBottom: 20 }} />

      <ErrorBoundary caller='Home Media Row'>
        <MediaRow title='Top Remixes' query='rem' tracks={tracks} />
        <MediaRow title='Top Hip Hop' query='hip' tracks={tracks} />
        <MediaRow title='Top R & B' query='r&' tracks={tracks} />
        <MediaRow title='Top Reggae' query='regg' tracks={tracks} />
      </ErrorBoundary>

      <Divider style={{ marginTop: 15, marginBottom: 30 }} />


      <ErrorBoundary caller='Home Sponsored Card'>
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
      </ErrorBoundary>

      <ErrorBoundary caller='Home Explore Cards'>
        <View style={{ flex: 1, marginBottom: 50, justifyContent: 'center', alignItems: 'center' }}>
          
          {topRemixes.slice(0, 2).map((itm, idx) => (
            <ExploreCard {...props} key={idx} item={itm} />
          ))}

          {globalPosts && globalPosts.slice(0,2).map((itm, idx) => (
            <PostCard navigation={navigation} key={idx} item={itm}
              isAuthor={itm.uid === user.uid} />
          ))}

          {topRemixes.slice(3, 6).map((itm, idx) => (
            <ExploreCard {...props} key={idx} item={itm} />
          ))}

          {globalPosts && globalPosts.slice(3, 6).map((itm, idx) => (
            <PostCard navigation={navigation} key={idx} item={itm}
              isAuthor={itm.uid === user.uid} />
          ))}

       </View>
      </ErrorBoundary>

      <View style={{ height: 50 }}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    // paddingTop: 30,
    // flex: 1,
    // paddingBottom: 50,
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
