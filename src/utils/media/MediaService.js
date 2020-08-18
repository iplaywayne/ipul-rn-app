import React from 'react'
import { Player } from '@react-native-community/audio-toolkit'
import TrackPlayer, { useTrackPlayerEvents, TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';

import { ReadTracks } from './functions'
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
  if (!auth) return
  const [storeState, storeDispatch] = useStore()
  const { queued, currentTrack } = storeState
  
  // useTrackPlayerEvents(events, async (event) => {
  //   switch (event.type) {
  //     case TrackPlayerEvents.PLAYBACK_ERROR:
  //       console.warn('An error occurred while playing the current track.');
  //       return
  //     case TrackPlayerEvents.PLAYBACK_STATE:
  //       const isPlaying = event.state === 'playing'
  //       const isLoading = event.state === 'loading'
  //       const isIdle = event.state === 'idle'
  //       if (isPlaying) {
  //         storeDispatch.setPlaying(true)
  //       } else {
  //         storeDispatch.setPlaying(false)
  //       }
  //       return
  //     case TrackPlayerEvents.PLAYBACK_QUEUE_ENDED:
  //       console.log(currentTrack.acid, 'has ended')
  //       TrackPlayer.reset()
  //       storeDispatch.setQueued([])
  //       storeDispatch.setPlaying(false)
  //       return
  //     default:
  //       console.log('?? useTrackPlayerEvents State', event.type)
  //       return
  //   }
  // });

  // React.useEffect(() => {
  //   if (!auth) return
  //   getTracks(result => storeDispatch.setTracks(result))
  //   // console.log('[MEDIASERVICE] [', auth.currentUser.displayName ? 'Ready' : 'Accounts needs setup', ']')
  // }, [])

  // React.useEffect(() => {
  //   if (storeState.tracks.length && storeDispatch.isPlaying) {
  //     const trkChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
  //       const track = await TrackPlayer.getTrack(data.nextTrack);
  //     })
  //     const queueEnd = TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
  //       console.log(`[MEDIASERVICE] Your playlist has ended`);
  //       TrackPlayer.removeUpcomingTracks()
  //       storeDispatch.setQueued([])
  //       storeDispatch.setPlaying(false)
  //     })
  //   }
  //   return () => { }
  // }, [storeDispatch.isPlaying])


  // const setup = () => {
  //   TrackPlayer.setupPlayer().then(() => {
  //     // Player setup with options
  //     TrackPlayer.updateOptions({
  //       capabilities: [
  //         TrackPlayer.CAPABILITY_PLAY,
  //         TrackPlayer.CAPABILITY_PAUSE,
  //         TrackPlayer.CAPABILITY_STOP,
  //         TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
  //         TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  //       ],
  //     })
  //   })
  // }

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

  const getTrackById = acid => {
    const result = getTracks(result => result.filter(t => t.acid === acid))
    console.log(result)
  }

  const getTracks = cb => ReadTracks(cb)

  const getFavorites = (uid, cb) => {
    if (!uid) return cb('Missing UID Param')

    const trkRef = firebase.database().ref(`${favsPath}${uid}`)
    trkRef.once('value', snap => {
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

  const addMediaLike = acid => {
    if (!acid) {
      console.log('Missing ACID')
      return
    }
    const userRef = database.ref(`mediaTracks/${acid}`)
    userRef.update({ likes: firebase.database.ServerValue.increment(1) })
  }

  const addMediaView = acid => {
    if (!acid) {
      console.log('Missing ACID')
      return
    }
    const userRef = database.ref(`mediaTracks/${acid}`)
    userRef.update({ views: firebase.database.ServerValue.increment(1) })
  }

  const addMediaPlay = acid => {
    if (!acid) {
      console.log('Missing ACID')
      return
    }
    const userRef = database.ref(`mediaTracks/${acid}`)
    userRef.update({ plays: firebase.database.ServerValue.increment(1) })
  }


  return { addAllToQueue, getTracks, getFavorites, addMediaLike, addMediaView, addMediaPlay }
}

export default MediaService
