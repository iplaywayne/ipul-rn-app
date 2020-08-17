import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, Divider } from 'react-native-paper'
import TrackPlayer from 'react-native-track-player'

import { siteLogo, logo } from '../../constants'
import { useStore } from '../../utils'
import { SendPlayerDetails, TrackPlayerStructure } from '../../utils/media/functions'


export function MediaDetails({ route, navigation }) {
  const { item, user, tracks } = route.params
  const [storeState, storeDispatch] = useStore()
  const [tracksLikeThis, setTracksLikeThis] = React.useState(null)
  const { isPlaying, currentTrack, queued } = storeState



  const addQueue = async (item) => {
    console.log(TrackPlayerStructure(item))
    await TrackPlayer.setupPlayer()
    await TrackPlayer.add(TrackPlayerStructure(item))
    console.log('Done')
    setTimeout(async () => {
      const queued = await TrackPlayer.getQueue()
      storeDispatch.setQueued(queued)
    }, 250)
  }

  const playNow = async (item) => {
    if (!isPlaying && currentTrack !== item) {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.reset()
      await TrackPlayer.add(TrackPlayerStructure(item))
      await TrackPlayer.play()
      storeDispatch.setPlaying(true)
      storeDispatch.setCurrentTrack(item)
    } else if (!isPlaying && currentTrack === item) {
      TrackPlayer.play()
      storeDispatch.setPlaying(true)
    } else if (isPlaying && currentTrack === item) {
      TrackPlayer.pause()
      storeDispatch.setPlaying(false)
    } else {
      await TrackPlayer.setupPlayer()
      await TrackPlayer.reset()
      await TrackPlayer.add(TrackPlayerStructure(item))
      await TrackPlayer.play()
      storeDispatch.setPlaying(true)
      storeDispatch.setCurrentTrack(item)
    }
    setTimeout(async () => {
      const queued = await TrackPlayer.getQueue()
      storeDispatch.setQueued(queued)
    }, 250)
  }

  React.useEffect(() => {
    if (tracks.length > 0) {
      let tracksLikeThis = tracks.filter(t => t.acid !== item.acid &&
        JSON.stringify(t).includes(item.genre)).slice(0, 3)
      console.log(tracksLikeThis.length, item.genre)
      setTracksLikeThis(tracksLikeThis.length ? tracksLikeThis : tracks.slice(0, 3))
    }
  }, [tracks])


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 60, left: 25, zIndex: 10 }}>
        <Text style={{ fontWeight: '700' }}>
          <Icons style={{ fontSize: 25, color: 'white' }} name='arrow-down' />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FastImage source={item.art_link ? { uri: item.art_link } : logo}
          style={{ height: 400, width: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
          resizeMode='cover' />
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontWeight: '700', fontSize: 20 }}>{item.artist}</Text>
        <Text style={{}}>{item.title}</Text>
      </View>
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginHorizontal: 20
      }}>
        <Icons name='repeat' size={65} />

        <TouchableOpacity onPress={() => addQueue(item)}>
          <Icons name='plus' size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => playNow(item)}>
          {isPlaying && currentTrack !== item && <Icons name='play-circle' size={100} />}
          {isPlaying && currentTrack === item && <Icons name='pause-circle' size={100} />}
          {!isPlaying && <Icons name='play-circle' size={100} />}
        </TouchableOpacity>

        <Icons name='heart-outline' size={30} />
        <Icons name='skip-next' size={65} />
      </View>

      <Divider style={{ marginTop: 10 }} />

      <View>
        <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
          {user.name}, checkout more songs like this
        </Text>
      </View>

      <View>
        {tracksLikeThis && tracksLikeThis.map((itm, idx) => (
          <TouchableOpacity key={idx}
            onPress={() => navigation.push('MediaDetails', {
              item: itm, user: user, tracks: tracks
            })}
            style={{
              flexDirection: 'row', paddingLeft: 20, paddingBottom: 10,
              alignItems: 'center'
            }}>
            <FastImage source={itm.art_link ? { uri: itm.art_link } : logo}
              style={{
                height: 50, width: 50, borderRadius: 50 / 2
              }} />
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ padding: 0 }}>
                <Text style={{ fontWeight: '700' }}>{itm.artist}</Text> {itm.title}
              </Text>
              <Text style={{ opacity: .5 }}>{itm.genre}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>


      {
        queued.length > 0 &&
        <View>
          <Divider />

          <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
            Upcoming tracks
        </Text>
        </View>
      }

      <View>
        {queued && queued.map((itm, idx) => (
          <TouchableOpacity onPress={() => navigation.push('MediaDetails', {
            item: itm, user: user, tracks: tracks
          })}
            style={{
              flexDirection: 'row', paddingLeft: 20, paddingBottom: 10,
              alignItems: 'center'
            }}>
            <FastImage source={itm.art_link ? { uri: itm.art_link } : logo}
              style={{
                height: 50, width: 50, borderRadius: 50 / 2
              }} />
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ padding: 0 }}>
                <Text style={{ fontWeight: '700' }}>{itm.artist}</Text> {itm.title}
              </Text>
              <Text style={{ opacity: .5 }}>
                {currentTrack.acid === itm.acid ? 'Currently playing' : ''}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* <Text style={{ height: 500 }}>
        {JSON.stringify(route.params, null, 2)}
      </Text> */}
    </ScrollView >
  )
}