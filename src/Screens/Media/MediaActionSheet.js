import React from 'react'
import { View, Text, ActionSheetIOS } from 'react-native'

const MediaActionSheet = () =>
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ["Cancel", "Add to Queue", "Add to Favorites", "Report"],
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
          return
        case 2:
          console.log('Add to Favorites')
          return
        case 3:
          console.log('Report')
          return
        default:
          return
      }
    }
  );

export default MediaActionSheet
