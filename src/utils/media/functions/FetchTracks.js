import React from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'

const domain = process.env.NODE_ENV === 'development' ?
  'http://localhost:5000' : 'https://www.iplayulisten.com'


const FetchTracks = async () => {
  try {
    const { data } = await axios.post(`${domain}/api/media`)
    return { data: data ? data.media : 'Connected. Could not fetch media', domain }
  } catch (e) {
    return { message: 'Oops, API request failed', error: e }
  }
}

export default FetchTracks
