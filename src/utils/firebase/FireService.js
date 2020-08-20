import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { firebase, database } from './Firebase'
import { StoreContext } from '../store'

class FireService {
  static contextType = StoreContext

  state = {

  }

  componentWillUnmount() {
    this.state.userRef.off()
  }

  readUsers = () => {
    this.state.userRef = database.ref(`users`)
    return this.state.userRef.once('value', snap => {
      return snap.val()
    }).then(res => {
      let list = []
      res.forEach(user => {
        list.push(user.val())
      })
      return list
    })
  }

  async readUserByIdSync(uid) {
    if (!uid) return
    this.state.userRef = database.ref(`users/${uid}`)
    return this.state.userRef.once('value', snap => {
      return snap.val()
    }).then(res => res.val())
  }

  readUserById(uid, next) {
    if (!uid) return

    this.state.userRef = database.ref(`users`)
    this.state.userRef.once('value', snap => {
      snap.forEach(child => {
        if (child.val().uid === uid) {
          if (next) next(child.val())
        }
      })
    })
  }

}

export default new FireService()
