import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { firebase, database } from './Firebase'


class FireStore {
  state = {

  }

  readUserById(uid,next) {
    if (!uid) return
    const userRef = database.ref(`users`)
    userRef.once('value', snap => {
      snap.forEach(child => {
        if (child.val().uid === uid) next(child.val())
      })
    })
  }

}

export default new FireStore()
