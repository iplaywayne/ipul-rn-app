import React from 'react'
import { View, Text } from 'react-native'

import { database } from '../firebase'
import PostService from '../post/PostService'
import FireService from '../firebase/FireService'


const NotifService = () => {

  const readLikedPosts = async uid => {
    const userRef = database.ref(`likes/posts`)
    const myPosts = await PostService.getUserPostsSync(uid)

    return userRef.once('value', snap => {
      snap.val()
    }).then(res => {
      let likedPosts = []
      res.forEach(doc => {
        doc.forEach(post => {
          if (myPosts.find(p => p.key === post.val().key)) { // && post.val().uid !== uid
            likedPosts.unshift(post.val())
          }
        })
      })
      return likedPosts
    })
  }


  return { readLikedPosts }
}

export default NotifService
