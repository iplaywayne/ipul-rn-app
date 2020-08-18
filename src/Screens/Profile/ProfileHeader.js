import React from 'react'
import {
  View, SafeAreaView, ScrollView, StyleSheet, Image, Alert, TouchableOpacity,
  Dimensions, StatusBar, Animated, ActivityIndicator, ActionSheetIOS, Text
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Avatar } from 'react-native-elements'

import Btn from '../../components/Prebuilt/Button'


const ProfileHeader = ({ user, navigation, playNowTapped }) => {
  const { avatar, name, mood, bio, occupation, isLoading, isPlaying } = user

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 10, marginLeft: 20, flexDirection: 'row' }}>

        {avatar ?
          <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile', {
            user
          })}>

            <FastImage
              style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
              source={{
                uri: avatar,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
          :
          <Avatar.Text size={100} label={name.substring(0, 2)}
            style={{ backgroundColor: '#444' }} />}

        <View style={{ marginLeft: 15, justifyContent: 'center', marginTop: 5 }}>
          <Text h6 style={{ fontWeight: 'bold' }}>{name}</Text>
          <Text h7 style={{ color: 'gray' }}>{occupation}</Text>
          <View>
            {mood && 'id' in mood ?
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '700', marginRight: 2 }}>Mood</Text>
                <Text>{mood.title}</Text>
              </View>
              :
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '700', marginRight: 2 }}>Mood</Text><Text>not set</Text>
              </View>}
          </View>

          <Text>{bio}</Text>
        </View>
      </View>

      <View style={{
        justifyContent: 'center',
        paddingHorizontal: 5, paddingTop: 5, paddingBottom: 10, flexDirection: 'row'
      }}>
        <Btn
          title='Update Profile'
          onPress={() => navigation.navigate('UpdateProfile', {
            user,
          })}
        />
        <Btn
          title='Set Your Mood'
          onPress={() => navigation.push('UpdateMood')}
        />
        <Btn
          color='#350DB6'
          title={isLoading ? <ActivityIndicator /> : `${isPlaying ? 'Pause Now' : 'Play Now'}`}
          onPress={() => playNowTapped()}
        />
      </View>
    </View>
  )
}

export default ProfileHeader
