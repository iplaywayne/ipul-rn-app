import React from 'react'
import { View, Text, Image } from 'react-native'
import { Divider, TextInput } from 'react-native-paper'

import PostService from '../../../utils/post/PostService'
import Btn from '../../../components/Prebuilt/Button'


const PendingPost = ({ user, postDetails, onChange }) => {


  const handlePostTask = details => {
    PostService.putPost(user.uid, details,
      progress => {
        console.log(`${progress}% complete`)
      })
  }


  return (
    <View style={{ flex: 1 }}>
      {postDetails &&
        <View>
          <View style={{ paddingHorizontal: 20 }}>
            {postDetails && <Text style={{ fontSize: 15 }}>
              You have a pending post</Text>}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Image
                style={{ height: 50, width: 50, borderRadius: 5 }}
                source={{ uri: postDetails.type === 'image' ? postDetails.image : postDetails.video }} />

            </View>

            <Text style={{ marginVertical: 10 }}>Enter your post caption</Text>
            <TextInput
              clearButtonMode={'while-editing'}
              height={80}
              maxLength={100}
              onChange={e => {
                console.log(e.nativeEvent.text)
                onChange(state => ({
                  ...postDetails,
                  caption: e.nativeEvent.text
                }))
              }}
            />
            <Btn title='Post Now' containerStyle={{ marginTop: 10 }}
              disabled={postDetails.caption === ''}
              onPress={() => handlePostTask(postDetails)} />

          </View>
          <Divider style={{ marginVertical: 20 }} />
        </View>}
    </View>
  )
}

export default PendingPost
