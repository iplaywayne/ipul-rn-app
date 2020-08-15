import React from 'react'
import { View, Text } from 'react-native'

import { firebase, storage } from '../firebase'


function PostService() {

  const test = (details, progress) => {
    if (!details) throw new Error('Missing details to complete post task')
    const { type, image, video } = details

    if (!image && !video) {
      console.log(details)
      console.log({ message: 'Missing Media Param', details })
      return
    }

    const file = image ? image : video
    const metadata = { contentType: image ? 'image/jpeg' : 'video/mp4' }
    const ext = image ? '.png' : '.mp4'

    const storageRef = storage.ref()
    const uploadTask = storageRef.child(`demo/demo${ext}`).putFile(file, metadata)

    var next = function (snapshot) {
      var percent = snapshot.bytesTransferred / snapshot.totalBytes
      progress(percent)
    };
    var error = function (error) { console.log(error) };
    var complete = function () { console.log('Done!') };

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete);
  }

  return { test }
}

export default PostService
