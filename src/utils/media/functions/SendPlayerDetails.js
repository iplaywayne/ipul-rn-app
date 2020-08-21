import TrackPlayer from 'react-native-track-player'
import { logo } from '../../../assets/images/ipul_logo_trans.png'


export const TrackPlayerStructure = item => ({
  idx: Math.random(item.acid * 1100),
  id: item.acid,
  title: item.title,
  artist: item.artist,
  genre: item.genre,
  album: 'iPlayuListen App',
  artwork: trimWWWString(item.art_link) || logo,
  url: trimWWWString(item.song),
})

export const SendPlayerDetails = async (item, storeDispatch) => {
  if (!item) throw new Error('Missing Item Param')
  if (!storeDispatch) throw new Error('Missing StoreDispatch Param')

  await TrackPlayer.add(TrackPlayerStructure(item))

  setTimeout(async () => {
    const queued = await TrackPlayer.getQueue()
    storeDispatch.setQueued(queued)
  }, 250)

  await TrackPlayer.play()
  storeDispatch.setCurrentTrack(item)
  storeDispatch.setPlaying(true)
  await setTimeout(() => storeDispatch.setLoading(false), 250)
}