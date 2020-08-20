import React from 'react'
import { Player } from '@react-native-community/audio-toolkit'
import TrackPlayer, { useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';
import Snackbar from 'react-native-snackbar'

import { ReadTracks } from './functions'
import { firebase, database, auth, trimWWWString } from '../../utils'
import { useStore } from '../store'
import MediaService from '../media/MediaService'


// Subscribing to the following events inside MyComponent
const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
  TrackPlayerEvents.PLAYBACK_QUEUE_ENDED

];

function TrackService() {
  if (!auth) return
  const [storeState, storeDispatch] = useStore()
  const { tracks, queued, currentTrack } = storeState
  const mediaService = MediaService()


  React.useLayoutEffect(() => {
    if (auth && !tracks.length)
      getTracks(result => storeDispatch.setTracks(result))
    return () => { }
  }, [])


  setPlaybackListener = async () => {
    TrackPlayer.addEventListener('playback-state', async (data) => {
      const playingId = await TrackPlayer.getCurrentTrack()
      switch (data.state) {
        case 'loading':
          storeDispatch.setLoading(true)
          return
        case 'buffering':
          return
        case 'ready':
          storeDispatch.setLoading(false)
          return
        case 'playing':
          if (playingId === currentTrack.acid) {
            console.log('Playing Track', currentTrack.title)
            storeDispatch.setPlaying(true)
          }
        default:
          console.log(data.state)
          return
      }
    })
  }


  React.useLayoutEffect(() => {
    setPlaybackListener()
    TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
      console.log(`[TRACKSERVICE] Your playlist has ended`);
      Snackbar.show({
        text: `Your playlist has ended`,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: 'skyblue',
        action: {
          text: 'OK',
          textColor: 'skyblue',
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
      // Player setup with options
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

  const addAllToQueue = async () => {
    TrackPlayer.add(state.tracks)
      .then(res => {
        TrackPlayer.play()
          .then(r => r.json())
          .then(r => console.log(r))
          .catch(e => console.log(e))
      })
      .catch(err => console.warn('error', err))
  }

  const getTracks = cb => ReadTracks(cb)


  return { setup, addAllToQueue, getTracks }
}

export default TrackService
