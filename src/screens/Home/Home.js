import React from 'react'
import { View, Button as Btn, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
import { Divider } from 'react-native-paper'
import { Shadow } from 'react-native-neomorph-shadows';
import Popover from 'react-native-popover-view';
import Spinner from 'react-native-spinkit'
import Button from 'react-native-button'
import Snackbar from 'react-native-snackbar'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import axios from 'axios'
import { RNS3 } from 'react-native-aws3'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'
import Config from 'react-native-config'
import { Center, MiniCard, ExploreCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import TrackService from '../../utils/media/TrackService'
import { ErrorBoundary } from '../../components'
import PostService from '../../utils/post/PostService'
import { messaging } from '../../utils/firebase'
import FCMService from '../../utils/notifs/FCMService'
import MediaRow from '../../components/Media/MediaRow'
import HomeHeader from './HomeHeader'
import { API, process } from '../../../api-host'


function Home(props) {
  const { navigation } = props
  const [storeState, storeDispatch] = useStore()
  const { user, isAdmin, tracks } = storeState
  const name = user?.name
  const trackService = TrackService()
  const topRemixes = tracks && tracks.filter(trk => JSON.stringify(trk).toLowerCase().includes('s')).slice(0, 11)
  const [loading, setLoading] = React.useState(true)
  const [globalPosts, setGlobalPosts] = React.useState(null)
  const [alertMessage, setAlertMessage] = React.useState()
  const fcmService = FCMService

  const runApi = () => {
    axios(API)
      .then(res => console.log(res.data, process.env.ATLAS_ACCESSKEY))
      .catch(err => console.warn(err))


    // ImagePicker.showImagePicker(res => {
    // const file = {
    //   uri: res.uri,
    //   name: "image.png",
    //   type: "image/png"
    // }
    // const options = {
    //   keyPrefix: "",
    //   bucket: "ipul-media-demo",
    //   region: "us-east-1",
    //   accessKey: "",
    //   secretKey: "",
    //   successActionStatus: 201
    // }
    // RNS3.put(file, options)
    //   .then(res => console.log(res.body.postResponse.location))
    //   .catch(err => console.log(err))
    // })
  }

  React.useLayoutEffect(() => {
    PostService.getGlobalPosts(posts => {
      setGlobalPosts(posts)
    })
    trackService.setup()

    setTimeout(() => setLoading(false), 1000)
    PushNotificationIOS.cancelAllLocalNotifications()
    return () => { }
  }, [tracks])

  if (loading) return <Center><Spinner type='Wave' /></Center>

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>

      <ErrorBoundary caller='Home Header'>
        <HomeHeader name={user.name} isAdmin={isAdmin} />
      </ErrorBoundary>

      <Button onPress={runApi}>
        <Text>Press</Text>
      </Button>

      <Divider style={{ marginBottom: 20 }} />



      <ErrorBoundary caller='Home Media Row'>
        <MediaRow title='Top Remixes' query='rem' tracks={tracks} />
        <MediaRow title='Top Hip Hop' query='hip' tracks={tracks} />
        <MediaRow title='Top R & B' query='r&' tracks={tracks} />
        <MediaRow title='Top Reggae' query='regg' tracks={tracks} />
      </ErrorBoundary>

      <Divider style={{ marginTop: 15, marginBottom: 30 }} />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {

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