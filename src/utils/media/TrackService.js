import React from 'react'
import TrackPlayer from 'react-native-track-player';
import Snackbar from 'react-native-snackbar'

import { ReadTracks } from './functions'
import { firebase, database, auth, trimWWWString } from '../../utils'
import { useStore } from '../store'
import MediaService from '../media/MediaService'
import { SendPlayerDetails, TrackPlayerStructure } from '../../utils/media/functions'


function TrackService() {
  const [storeState, storeDispatch] = useStore()
  const { tracks, queued, currentTrack } = storeState
  const mediaService = MediaService()


  React.useLayoutEffect(() => {
    if (auth && !tracks.length)
      getTracks(result => storeDispatch.setTracks(result))
    return () => { }
  }, [])

  React.useLayoutEffect(() => {
    TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
      Snackbar.show({
        text: `Your playlist has ended`,
        textColor: 'black',
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'skyblue',
        action: {
          text: 'OK',
          textColor: 'black',
          onPress: () => { /* Do something. */ },
        },
      });
      TrackPlayer.removeUpcomingTracks()
      storeDispatch.setQueued([])
      storeDispatch.setPlaying(false)
    })

    return () => {
      TrackPlayer.remove('playback-state')
      TrackPlayer.remove('playback-track-changed')
      TrackPlayer.remove('playback-queue-ended')
    }
  }, [])

  const setup = () => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
      })
    })
  }

  const play = async (item) => {
    storeDispatch.setCurrentTrack(item)
    await TrackPlayer.play()
    storeDispatch.setPlaying(true)
  }

  const pause = async () => {
    await TrackPlayer.pause()
    storeDispatch.setPlaying(false)
  }

  const addAllToQueue = async () => {
    TrackPlayer.add(tracks)
      .then(res => {
        TrackPlayer.play()
          .then(r => r.json())
          .then(r => console.log(r))
          .catch(e => console.log(e))
      })
      .catch(err => console.warn('error', err))
  }

  const getTracks = cb => ReadTracks(cb)


  return { setup, addAllToQueue, getTracks, play, pause }
}

export default TrackService
