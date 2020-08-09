import React from 'react'
import { Player } from '@react-native-community/audio-toolkit'
import TrackPlayer from 'react-native-track-player';

import { firebase, database, auth, trimWWWString } from '../../utils'
import { useStore } from '../store'
const tracksPath = `/mediaTracks`
const favsPath = `/favorites/`


function MediaService() {
  const [state, dispatch] = useStore()

  React.useEffect(() => {
    getTracks(result => dispatch.setTracks(result))
    console.log('[MEDIASERVICE] [', auth.currentUser.displayName, ']')
  }, [])

  React.useEffect(() => {
    if (state.tracks.length) {
      console.log('[MEDIASERVICE] Loaded', state.tracks.length)
      TrackPlayer.addEventListener('playback-track-changed', async (data) => {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        console.log({ trackTitle: track });
      })
    }
  }, [state.tracks])


  const debug = () => {
    TrackPlayer.setupPlayer().then(() => {
      // Player setup
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
          // Player options
          TrackPlayer.updateOptions({
            capabilities: [
              TrackPlayer.CAPABILITY_PLAY,
              TrackPlayer.CAPABILITY_PAUSE,
              TrackPlayer.CAPABILITY_STOP,
              TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
              TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            ],
          })
          // Player activated
          TrackPlayer.play()
        })
        .catch(err => console.warn('error', err))
    })
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


  return { debug, getTracks, getFavorites }
}

export default MediaService
