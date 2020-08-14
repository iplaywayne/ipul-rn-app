import React from 'react'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, Divider } from 'react-native-paper'

import { siteLogo, logo } from '../../constants'
import { useStore } from '../../utils'
import { SendPlayerDetails } from '../../utils/media/functions'


export function MediaDetails({ route, navigation }) {
  const { item, user, tracks } = route.params
  const [storeState, storeDispatch] = useStore()
  const [tracksLikeThis, setTracksLikeThis] = React.useState(null)
  const { isPlaying, currentTrack, queued } = storeState

  const addQueue = async (item) => {
    SendPlayerDetails(item, storeDispatch)
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
      headerShown: null
    })
  }, [])

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 60, left: 25, zIndex: 10 }}>
        <Text style={{ fontWeight: '1000' }}>
          <Icons style={{ fontSize: 25, color: 'white' }} name='arrow-down' />
        </Text>
      </TouchableOpacity>

      <FastImage source={item.art_link ? { uri: item.art_link } : logo}
        style={{ height: 400, width: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
        resizeMode='cover' />

      <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontWeight: '700', fontSize: 20 }}>{item.artist}</Text>
        <Text style={{}}>{item.title}</Text>
      </View>
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginHorizontal: 40
      }}>
        <Icons name='skip-previous' size={75} />

        <TouchableOpacity onPress={() => addQueue(item)}>
          {isPlaying && currentTrack === item
            ?
            <Icons name='play-circle' size={100} />
            :
            <Icons name='pause-circle' size={100} />}
        </TouchableOpacity>

        <Icons name='skip-next' size={75} />
      </View>

      <Divider style={{ marginTop: 10 }} />

      <View>
        <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
          {user.name}, checkout more songs like this
        </Text>
      </View>

      <View>
        {tracksLikeThis && tracksLikeThis.map((itm, idx) => (
          <TouchableOpacity onPress={() => navigation.replace('MediaDetails', {
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

      <Divider />

      <View>
        <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
          Upcoming tracks
        </Text>
      </View>

      <View>
        {queued && queued.map((itm, idx) => (
          <TouchableOpacity onPress={() => navigation.replace('MediaDetails', {
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
    </ScrollView>
  )
}