import React from 'react'
import { View, Text } from 'react-native'

import PostCard from '../../components/Post/PostCard'


const ProfileCards = ({ user, userPosts, navigation }) => {
  return (
    <View style={{
      paddingTop: 20,
      paddingBottom: 50, justifyContent: 'center', alignItems: 'center'
    }}>
      {userPosts.map((itm, idx) => (
        <PostCard navigation={navigation} key={idx} item={itm}
          isAuthor={itm.uid === user.uid} />
      ))}
    </View>
  )
}

export default ProfileCards
