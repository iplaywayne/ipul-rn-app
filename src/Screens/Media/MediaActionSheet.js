import React from 'react'
import { View, Text, ActionSheetIOS } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import { SendPlayerDetails, TrackPlayerStructure } from '../../utils/media/functions'
import MediaService from '../../utils/media/MediaService'
import TrackService from '../../utils/media/TrackService'
import { useStore, wait } from '../../utils'


const MediaActionSheet = (item, storeDispatch) => {
  console.log(item.title)

  return ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", "Add to Queue", "Report"],
      destructiveButtonIndex: 3,
      cancelButtonIndex: 0
    },
    buttonIndex => {
      switch (buttonIndex) {
        case 0:
          console.log('Cancel')
          return
        case 1:
          console.log('Add to Queue')
          storeDispatch.addToQueue(item)
          return
        // case 2:
        //   console.log('Add to Favorites')
        //   return
        case 2:
          console.log('Report')
          return
        default:
          return
      }
    }
  );
}


export default MediaActionSheet
