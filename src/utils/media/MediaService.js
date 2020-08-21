import React from 'react'
import TrackPlayer from 'react-native-track-player';

import { ReadTracks } from './functions'
import { firebase, database, auth, trimWWWString } from '../../utils'
import { useStore } from '../store'

const tracksPath = `/channels/media`
const favsPath = `/favorites/`


function MediaService() {
  const [storeState, storeDispatch] = useStore()
  const { queued, currentTrack } = storeState

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
    return result
  }
  const getTrackByIdSync = async acid => {
    const result = getTracks(result => result.filter(t => t.acid === acid))
    return result
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
    const userRef = database.ref(`channels/media/${acid}`)
    userRef.update({ likes: firebase.database.ServerValue.increment(1) })
  }

  const addMediaView = acid => {
    if (!acid) {
      console.log('Missing ACID')
      return
    }
    const userRef = database.ref(`channels/media/${acid}`)
    userRef.update({ views: firebase.database.ServerValue.increment(1) })
  }

  const addMediaPlay = acid => {
    if (!acid) {
      console.log('Missing ACID')
      return
    }
    const userRef = database.ref(`channels/media/${acid}`)
    userRef.update({ plays: firebase.database.ServerValue.increment(1) })
  }


  return {
    addAllToQueue, getTracks, getFavorites, addMediaLike, addMediaView,
    addMediaPlay, getTrackById, getTrackByIdSync
  }
}

export default MediaService
