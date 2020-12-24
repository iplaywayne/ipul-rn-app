import TrackPlayer from 'react-native-track-player'

import MediaService from '../../../utils/media/MediaService'
import TrackService from '../../../utils/media/TrackService'
import LocalAlert from '../../../utils/notifs/LocalAlert'
import { useStore } from '../../../utils/store'


export const PreviousTapped = async (tracks, uid) => {
  try {
    await TrackPlayer.skipToPrevious()
    let prevId = await TrackPlayer.getCurrentTrack()
    let crtTrk = tracks.filter(t => t.acid === prevId)[0]
    return { status: 'success', track: crtTrk }
  } catch (err) {
    LocalAlert('Notification', err.message)
    return { error: err.message }
  }
}