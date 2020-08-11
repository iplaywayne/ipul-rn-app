import { firebase, database, auth, trimWWWString } from '../../../utils'

const tracksPath = `/mediaTracks`

export const ReadTracks = cb => {
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