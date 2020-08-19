import React from 'react'
import { View, Text } from 'react-native'

import { firebase, storage, database } from '../firebase'


const PostService = (function () {

  const putPost = (uid, details, progress, next) => {
    if (!details) throw new Error('Missing details to complete post task')
    const { type, image, video } = details

    if (!image && !video) {
      console.log({ message: 'Missing Media Param', details })
      return
    }

    const file = image ? image : video
    const metadata = { contentType: image ? 'image/jpeg' : 'video/mp4' }
    const ext = image ? '.png' : '.mp4'

    const userRef = database.ref(`channels/posts/${uid}/`)
    const userPush = userRef.push({ ...details, uid, image: '' })
    const keyRef = database.ref(`channels/posts/${uid}/${userPush.key}`)

    const storageRef = storage.ref(`channels/posts/${uid}/`)
    const childRef = storageRef.child(`${userPush.key}/${userPush.key}${ext}`)

    const uploadTask = childRef.putFile(file, metadata)

    var task = function (snapshot) {
      var percent = snapshot.bytesTransferred / snapshot.totalBytes
      progress(Math.round(percent * 100))
    };
    var error = function (error) { console.log(error) };
    var complete = function (data) {
      childRef.getDownloadURL().then(url => {
        image && keyRef.update({ key: userPush.key, image: url })
        video && keyRef.update({ key: userPush.key, video: url })
        next(url)
      })
    };

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      task,
      error,
      complete);
  }

  const removePost = (uid, key) => {
    if (!uid || !key) throw new Error('Missing removePost param')
    const userRef = database.ref(`channels/posts/${uid}/${key}`)
    const storageRef = storage.ref(`channels/posts/${uid}/${key}/${key}.png`)
    const storageRefB = storage.ref(`channels/posts/${uid}/${key}/${key}_350x350.png`)
    userRef.remove().then(_ => {
      console.log(key, 'Post Data Removed!')
    })
    storageRef.delete().then(_ => {
      console.log(key, 'Post Media Removed!')
    })
    storageRefB.delete().then(_ => {
      console.log(key, 'Post MediaB Removed!')
    })
  }

  const addPostLike = async (uid, key, val) => {
    if (!uid || !key) throw new Error('Missing addPostLike param')

    const postRef = database.ref(`likes/posts/${key}/${uid}`)
    postRef.update({ liked: val })
  }

  const isPostLiked = async (uid, key) => {
    if (!uid || !key) throw new Error('Missing isPostLiked param')
    const postRef = database.ref(`likes/posts/${key}`)
    // try {
      return postRef.once('value').then(res => res.val()[uid].liked)
    // } catch (e) {
    //   return false
    // }
  }

  const getUserPosts = (uid, next) => {
    if (!uid) return
    let list;
    const userRef = database.ref(`channels/posts/${uid}`)
    userRef.on('value', snap => {
      let list = []
      snap.forEach(child => {
        list.unshift(child.val())
      })
      next(list)
    })
  }

  const getGlobalPosts = (next) => {
    let list;
    const userRef = database.ref(`channels/posts/`)
    userRef.on('value', snap => {
      let list = []
      snap.forEach(child => {
        child.forEach(baby => {
          list.push(baby.val())
        })
      })
      next(list)
    })
  }

  return { putPost, removePost, addPostLike, isPostLiked, getUserPosts, getGlobalPosts }
})()

export default PostService
