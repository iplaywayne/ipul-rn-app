import { firebase, database, auth, trimWWWString } from '../../../utils'
export { SendPlayerDetails, TrackPlayerStructure } from './SendPlayerDetails'


const tracksPath = `/channels/media`

export const ReadTracks = cb => {
  const trkRef = firebase.database().ref(tracksPath)
  trkRef.on('value', snap => {
    let list = []
    snap.forEach(child => {
      list.unshift({
        ...child.val(),
        art_link: trimWWWString(child.val().art_link),
        song: trimWWWString(child.val().song),
      })
    })

    // list.forEach(t => {
    //   const newTrkRef = firebase.database().ref(`/channels/media/${t.acid}`)
    //   newTrkRef.set(t)
    //   newTrkRef.off()
    // })

    if (cb) cb(list)
    if (!cb) console.log('Callback Missing', list.length)
  })
}