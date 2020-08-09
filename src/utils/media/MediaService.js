import React from 'react'
import { Player } from '@react-native-community/audio-toolkit'
import TrackPlayer, { useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';

import { firebase, database, auth, trimWWWString } from '../../utils'
import { useStore } from '../store'
const tracksPath = `/mediaTracks`
const favsPath = `/favorites/`

// Subscribing to the following events inside MyComponent
const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
  TrackPlayerEvents.PLAYBACK_QUEUE_ENDED

];

function MediaService() {
  const [storeState, storeDispatch] = useStore()
  const { queued } = storeState

  useTrackPlayerEvents(events, (event) => {
    switch (event.type) {
      case TrackPlayerEvents.PLAYBACK_ERROR:
        console.warn('An error occurred while playing the current track.');
        return
      case TrackPlayerEvents.PLAYBACK_STATE:
        console.log('[MEDIASERVICE]', event.state, queued.length)
        storeDispatch.setPlaying(event.state === 'playing' ? true : false)
        storeDispatch.setLoading(event.state === 'loading' ? true : false)
        return
      default:
        console.log('Unknown State', event.type)
        return
    }
    // if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
    //   console.warn('An error occurred while playing the current track.');
    // }
    // if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
    //   console.log('[MEDIASERVICE]', event.state, queued.length)
    //   storeDispatch.setPlaying(event.state === 'playing' ? true : false)
    //   if (event.state == 'loading') {
    //     console.log('Hol up, this track seems to still be loading . .')
    //   }
    // }
    if (event.type === TrackPlayerEvents.PLAYBACK_QUEUE_ENDED) {
      TrackPlayer.reset()
    }
  });

  React.useEffect(() => {
    getTracks(result => storeDispatch.setTracks(result))
    console.log('[MEDIASERVICE] [', auth.currentUser.displayName, ']')
  }, [])

  // React.useEffect(() => {
  //   if (state.tracks.length) {
  //     console.log('[MEDIASERVICE] Loaded', state.tracks.length)
  //     const trkChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
  //       const track = await TrackPlayer.getTrack(data.nextTrack);
  //       console.log(`[MEDIASERVICE] You are playing ${track.title}`);
  //     })
  //     const queueEnd = TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
  //       console.log(`[MEDIASERVICE] Your playlist has ended`);
  //       TrackPlayer.reset()
  //     })
  //   }
  // }, [state.tracks])


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
        ],
      })
    })
  }

  const addAllToQueue = async () => {
    TrackPlayer.add(state.tracks.map((trk) => {
      return {
        id: trk.acid,
        title: trk.title,
        artist: trk.artist,
        url: trimWWWString(trk.song),
        artwork: trimWWWString(trk.art_link)
      }
    }))
      .then(res => {
        TrackPlayer.play()
          .then(r => r.json())
          .then(r => console.log(r))
          .catch(e => console.log(e))
      })
      .catch(err => console.warn('error', err))
  }

  const getTracks = cb => {
    const trkRef = firebase.database().ref(tracksPath)
    trkRef.on('value', snap => {
      let list = []
      snap.forEach(child => {
        list.push({
          ...child.val(),
          art_link: trimWWWString(child.val().art_link),
          song: trimWWWString(child.val().song),
        })
      })
      if (cb) cb(list)
      if (!cb) console.log('Callback Missing', list.length)
    })
  }
  const getFavorites = (uid, cb) => {
    if (!uid) return cb('Missing UID Param')

    const trkRef = firebase.database().ref(`${favsPath}${uid}`)
    trkRef.on('value', snap => {
      let list = []
      snap.forEach(child => {
        list.push({
          ...child.val(),
          art_link: trimWWWString(child.val().art_link),
          song: trimWWWString(child.val().song),
        })
      })
      if (cb) cb(list)
      if (!cb) console.log('Callback Missing', list.length)
    })
  }


  return { setup, addAllToQueue, getTracks, getFavorites }
}

export default MediaService
