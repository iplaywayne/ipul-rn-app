import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { messaging } from '../firebase'


export class FCMService {
  state = {

  }

  componentDidMount() {
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
    // console.log('FCM Service Ready.')
  }

  componentWillUnmount() {

  }

}

export default FCMService
