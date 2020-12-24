import React from 'react'
import { View, Text, ActionSheetIOS } from 'react-native'
import TrackPlayer from 'react-native-track-player'

import { SendPlayerDetails, TrackPlayerStructure } from '../../utils/media/functions'
import MediaService from '../../utils/media/MediaService'
import TrackService from '../../utils/media/TrackService'
import { useStore, wait } from '../../utils'
import LocalAlert from '../../utils/notifs/LocalAlert'


const MediaActionSheet = (item, storeDispatch) => {
  if (!item?.acid) {
    console.log('MediaActionSheet missing item param')
    return
 }

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
          LocalAlert('Media Queue', `${item.title} has been added to your Queue`)
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
