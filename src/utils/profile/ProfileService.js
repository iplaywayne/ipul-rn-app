import React from 'react'
import { View, Text } from 'react-native'

import { firebase, storage, database } from '../firebase'
import { useStore } from '../'


function ProfileService() {
  const [{ user }, storeDispatch] = useStore()


  const putAvatarImage = async (formState, image, progress, next) => {
    if (!formState) throw new Error('Missing Form Param')
    const { uid, name, bio, occupation } = formState
    if (!uid || !name || !bio || !occupation) {
      console.log('[DEBUG]', formState)
      throw new Error('[DEBUG] Missing Detail Param')
    }

    const userRef = database.ref(`users/${uid}`)

    if (!image) {
      userRef.update({ name, bio, occupation })
      setTimeout(() => {
        next(formState)
      }, 1000)

    } else {
      const metadata = { contentType: 'image/jpeg' }
      const storageRef = storage.ref()
      const childRef = storageRef.child(`users/${uid}/avatar.png`)
      const uploadTask = childRef.putFile(image, metadata)

      const task = snapshot => {
        const percent = snapshot.bytesTransferred / snapshot.totalBytes
        progress(percent)
      }
      const error = error => { throw new Error(error) };
      const complete = () => {
        childRef.getDownloadURL().then(url => {
          userRef.update({ avatar: url, name, bio, occupation })
          storeDispatch.setUser({ ...user, avatar: url, name, bio, occupation })
          userRef.off()
          next()
        })
      }

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        task,
        error,
        complete);
    }
  }


  return { putAvatarImage }
}

export default ProfileService
