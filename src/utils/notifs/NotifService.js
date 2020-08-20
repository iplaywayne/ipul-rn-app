import React from 'react'
import { View, Text } from 'react-native'

import { database } from '../firebase'
import PostService from '../post/PostService'
import FireService from '../firebase/FireService'


const NotifService = () => {
  const [list, setList] = React.useState([])

  const getPostLikes = async (uid, next) => {
    const users = await FireService.readUsers()
    let list = []
    readLikedUsers(uid, result => {
      result.forEach(id => {
        list.push(users.find(i => i.uid === id))
      })
      next(list)
    })
  }

  const readLikedUsers = async (uid, next) => {
    if (!uid) return

    const postIDs = await readLikedUserIDs(uid)
    const likeRef = database.ref(`likes/posts`)

    likeRef.once('value', snap => {
      let likedUsers = []
      snap.forEach(post => {
        if (postIDs.includes(post.key)) {
          post.forEach(user => {
            if (user.key === uid && user.val().liked) {
              likedUsers.push(user.key)
            }
          })
        }
      })
      next(likedUsers)
    })
  }

  const readLikedUserIDs = uid => {
    let postIDs = []
    const userRef = database.ref(`channels/posts/${uid}`)
    return userRef.once('value', snap => {
      snap.forEach(baby => postIDs.push(baby.key))
    }).then(res => {
      return postIDs
    })
  }

  const readLikedPosts = key => {
    let likedPosts = []
    const userRef = database.ref(`likes/posts`)
    return userRef.once('value', snap => {
      snap.val()
    }).then(res => {
      res.forEach(post => {
        post.forEach(user => {
          likedPosts.push(user.val())
        })
      })
      return likedPosts
    })
  }


  return { getPostLikes, readLikedPosts }
}

export default NotifService
