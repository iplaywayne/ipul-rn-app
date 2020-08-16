import React from 'react'
import { View, Text } from 'react-native'

import { firebase, storage, database } from '../firebase'


const PostService = (function () {

  const putPost = (uid, details, progress) => {

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

    const userRef = database.ref(`channels/posts/${uid}/`)
    const userPush = userRef.push({ ...details, uid, image: '' })
    const keyRef = database.ref(`channels/posts/${uid}/${userPush.key}`)
    keyRef.update({ key: userPush.key })
    console.log(uid, userPush.key)

    const storageRef = storage.ref(`channels/posts/${uid}/`)
    const childRef = storageRef.child(`${userPush.key}/${userPush.key}${ext}`)
    const childRefKey = childRef.key
    const uploadTask = childRef.putFile(file, metadata)
    var next = function (snapshot) {
      var percent = snapshot.bytesTransferred / snapshot.totalBytes
      progress(percent)
    };
    var error = function (error) { console.log(error) };
    var complete = function (data) {
      console.log('Done!', data)
      childRef.getDownloadURL().then(url => {
        console.log(url)
        image && keyRef.update({ image: url })
        video && keyRef.update({ video: url })
      })
    };

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete);
  }

  const getUserPosts = (uid, next) => {
    if (!uid) return
    const userRef = database.ref(`channels/posts/${uid}`)
    userRef.on('value', snap => {
      snap.forEach(child => {
        let list = []
        list.push(child.val())
        next(list)
      })
    })
  }

  return { putPost, getUserPosts }
})()

export default PostService
