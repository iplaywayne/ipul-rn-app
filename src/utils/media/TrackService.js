import React from 'react'
import { Player } from '@react-native-community/audio-toolkit'
import TrackPlayer, { useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';

import { ReadTracks } from './functions'
import { firebase, database, auth, trimWWWString } from '../../utils'
import { useStore } from '../store'
import MediaService from '../media/MediaService'


const tracksPath = `/mediaTracks`
const favsPath = `/favorites/`

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


  React.useEffect(() => {
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
        case 'paused':
          // if (playingId === currentTrack.acid) {
          //   console.log('Paused Track', currentTrack.title)
          //   storeDispatch.setPlaying(false)
          // }
          return
        default:
          console.log(data.state)
          return
      }
    })
  }


  React.useLayoutEffect(() => {
    let mounted = false
    if (storeState.tracks.length && mounted === false) {
      setPlaybackListener()

      // const trkChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      //   const track = await TrackPlayer.getTrack(data.nextTrack);
      //   console.log('[TODO] send track change listener data to store', data)
      //   storeDispatch.setPlaying(true)
      // })
      const queueEnd = TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
        console.log(`[TRACKSERVICE] Your playlist has ended`);
        TrackPlayer.removeUpcomingTracks()
        storeDispatch.setQueued([])
        storeDispatch.setPlaying(false)
      })
      mounted = true
    }
    return () => {
      mounted = true
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

    // TrackPlayer.add(state.tracks.map((trk) => {
    //   return {
    //     id: trk.acid,
    //     title: trk.title,
    //     artist: trk.artist,
    //     url: trimWWWString(trk.song),
    //     artwork: trimWWWString(trk.art_link)
    //   }
    // }))
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
