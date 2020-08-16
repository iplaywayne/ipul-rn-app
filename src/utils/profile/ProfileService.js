import React from 'react'
import { View, Text } from 'react-native'

import { firebase, storage } from '../firebase'

function ProfileService() {

  const putAvatarImage = (uid, image, progress) => {

    if (!uid || !image || !progress) {
      console.log({ message: 'Missing putAvatarImage param', uid, image, progress })
      return
    }

    const metadata = { contentType: 'image/jpeg' }
    const storageRef = storage.ref()
    const uploadTask = storageRef.child(`users/${uid}/avatar.png`).putFile(image, metadata)

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

  return { putAvatarImage }
}

export default ProfileService
