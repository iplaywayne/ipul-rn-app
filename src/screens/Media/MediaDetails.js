import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'react-native-paper'
import TrackPlayer from 'react-native-track-player'
import DoubleClick from 'react-native-double-tap'
import Snackbar from 'react-native-snackbar'
import Button from 'react-native-button'
import { default as Btn } from '../../components/Prebuilt/Button'
import { siteLogo, logo } from '../../constants'
import { useStore, wait } from '../../utils'
import { SendPlayerDetails, TrackPlayerStructure } from '../../utils/media/functions'
import MediaService from '../../utils/media/MediaService'
import TrackService from '../../utils/media/TrackService'
import MediaActionSheet from './MediaActionSheet'
import LocalAlert from '../../utils/notifs/LocalAlert'
import { PreviousTapped } from './functions/PreviousTapped'


export function MediaDetails({ route, navigation }) {
  const { item, user, tracks } = route.params || {}
  const [storeState, storeDispatch] = useStore()
  const [tracksLikeThis, setTracksLikeThis] = React.useState(null)
  const { isPlaying, currentTrack, queued, isLoading } = storeState
  const mediaService = MediaService()
  const trackService = TrackService()
  const [pageTrack, setPageTrack] = React.useState(null)
  const [nextTrack, setNextTrack] = React.useState(null)
  const [viewingTrack, setViewingTrack] = React.useState(null)
  const focusedTrack = pageTrack ? pageTrack : item
  const [isLiked, setIsLiked] = React.useState(false)


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
    setViewingTrack(item)
    initPlayer()
  }, [])

  React.useEffect(() => {
    if (viewingTrack?.acid) readIsLiked()
    if (currentTrack?.acid === item?.acid) setViewingTrack(null)
  }, [viewingTrack])

  React.useEffect(() => {
    if (tracks && tracks.length > 0) {
      let tracksLikeThis = tracks.filter(t => t?.acid !== item?.acid &&
        JSON.stringify(t).includes(item?.genre)).slice(0, 3)
      setTracksLikeThis(tracksLikeThis.length ? tracksLikeThis : tracks.slice(0, 3))
      storeDispatch.setLoading(false)
    }
  }, [tracks])


  const readIsLiked = async () => {
    try {
      const result = await mediaService.isMediaLiked(viewingTrack?.acid, user?.uid)
      setIsLiked(result?.liked)
    } catch {

    }
  }

  const initPlayer = async () => {
    const nowQueued = await TrackPlayer.getQueue()
    const nowState = await TrackPlayer.getState()
    const nowPosition = await TrackPlayer.getPosition()
    if (nowQueued.length < tracks.length) {
      await TrackPlayer.reset()
      await TrackPlayer.add(tracks.map(t => TrackPlayerStructure(t)))
    }
    console.log(nowState, nowPosition)
  }

  const handleAddMediaLike = async () => {
    if (!viewingTrack?.acid) {
      console.log('Missing Track Param')
      return
    }
    let result = await mediaService.addMediaLike(user, viewingTrack, !isLiked)
    setIsLiked(result?.liked)
    result?.liked && LocalAlert('Media Liked', `You liked ${viewingTrack.title} by ${viewingTrack.artist}`)
  }

  const handleAddTapped = () => MediaActionSheet(viewingTrack ? viewingTrack : item, storeDispatch)

  const handlePlayTapped = async () => {
    const nowQueued = await TrackPlayer.getQueue()
    const nowState = await TrackPlayer.getState()
    const nowPosition = await TrackPlayer.getPosition()
    const nowPlaying = await TrackPlayer.getCurrentTrack()
    const nowTrack = await TrackPlayer.getTrack(nowPlaying)
    const isViewingRequest = viewingTrack?.acid === item?.acid
    const thisTrack = route.params.item

    if (nowState === 'playing') {
      console.log('Media is currently playing', nowPlaying)
      trackService.pause()
      return
    } else if (nowState === 'paused') {
      trackService.play(currentTrack)
      return
    }

    if (nowQueued.length <= tracks.length) await initPlayer()

    await TrackPlayer.skip(thisTrack.acid)
    await trackService.play(thisTrack)
    setViewingTrack(null)
  }

  const handlePreviousTapped = async () => {
    try {
      await TrackPlayer.skipToPrevious()
      let prevId = await TrackPlayer.getCurrentTrack()
      let crtTrk = tracks.filter(t => t.acid === prevId)[0]
      console.log('Previous Tapped', crtTrk.title)
      setViewingTrack(crtTrk)
      trackService.play(crtTrk)
      const result = await mediaService.isMediaLiked(crtTrk.acid, user.uid)
      setIsLiked(result?.liked)
    } catch (err) {
      let anotherTrack = tracks[tracks.length - 1]
      await initPlayer()
      await TrackPlayer.skip(anotherTrack?.acid)
      await TrackPlayer.play()
      await trackService.play(anotherTrack)
      setViewingTrack(anotherTrack)
    }
  }

  const handleNextTapped = async () => {
    try {
      await TrackPlayer.skipToNext()
      let nextId = await TrackPlayer.getCurrentTrack()
      let crtTrk = tracks.filter(t => t.acid === nextId)[0]
      console.log('Next Tapped', crtTrk.title)
      setViewingTrack(crtTrk)
      trackService.play(crtTrk)
      const result = await mediaService.isMediaLiked(crtTrk.acid, user.uid)
      setIsLiked(result?.liked)
    } catch (err) {
      await initPlayer()
      let nextId = await TrackPlayer.getCurrentTrack()
      let crtTrk = tracks.filter(t => t.acid === nextId)[0]
      await TrackPlayer.play()
      await trackService.play(crtTrk)
    }
  }

  const handleSelectedTapped = async item => {
    initPlayer()

    setTimeout(async () => {
      await TrackPlayer.skip(item.acid)
      await trackService.play(item)
      setPageTrack(item)
      console.log('[SELECTEDREQUEST] Play')
    }, 250)
  }

  const handleRepeatMedia = () => {
    TrackPlayer.seekTo(0)
      .then(res => console.log('Done'))
      .catch(err => console.log('ERROR'))
  }


  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 25, left: 25, zIndex: 10 }}>
        <Text style={{ fontWeight: '700' }}>
          <Icons style={{ fontSize: 25, color: 'white' }} name='arrow-left' />
        </Text>
      </TouchableOpacity>

      <DoubleClick doubleTap={() => navigation.goBack()}>
        <FastImage source={viewingTrack?.art_link ? { uri: viewingTrack.art_link } : item?.art_link || logo}
          style={{ height: 400, width: '100%' }}
          resizeMode='cover' />
      </DoubleClick>

      <Divider />

      {viewingTrack?.acid &&
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 5, color: 'gray', marginTop: 1 }}>{isPlaying ? 'Playing' : 'Paused'}</Text>
            <Text style={{ fontWeight: '700', fontSize: 15 }}>{currentTrack?.artist ? currentTrack.artist : item?.artist}</Text>
            <Text style={{ marginLeft: 5, marginTop: 1, fontSize: 13 }}>{currentTrack?.title ? currentTrack.title : item?.title}</Text>
          </View>
        </View>}


      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginHorizontal: 20, marginTop: 10
      }}>
        <TouchableOpacity onPress={handlePreviousTapped}>
          <Icons name='skip-previous' size={65} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => handleAddTapped(viewingTrack))}>
          <Icons name='plus' size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => handlePlayTapped(viewingTrack), 250)}>
          {!isLoading ?
            <View>{isPlaying ? <Icons name='pause-circle' size={100} /> : <Icons name='play-circle' size={100} />}</View>
            :
            <ActivityIndicator style={{
              margin: 9,
              backgroundColor: 'black',
              padding: 31, borderRadius: 100 / 2
            }} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => handleAddMediaLike())}>
          <Icons name={isLiked ? 'heart' : 'heart-outline'} size={30} style={{ color: isLiked ? 'red' : 'black' }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => handleNextTapped())}>
          <Icons name='skip-next' size={65} />
        </TouchableOpacity>
      </View>

      <Divider style={{ marginTop: 10 }} />

      {nextTrack > 0 &&
        <View>
          <Divider />

          <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
            Next track is {nextTrack.title}
          </Text>
        </View>}

      <Text style={{ height: 500 }}>
        {JSON.stringify(route.params, null, 2)}
      </Text>
    </ScrollView >
  )
}