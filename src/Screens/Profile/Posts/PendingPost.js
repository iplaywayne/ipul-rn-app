import React from 'react'
import { View, Text } from 'react-native'


const PendingPost = () => {
  const [postDetailsPending, setPostDetailsPending] = React.useState(null)

  
  return (
    <View style={{ flex: 1 }}>
      {postDetailsPending &&
        <View>
          <View style={{ paddingHorizontal: 20 }}>
            {postDetailsPending && <Text style={{ fontSize: 15 }}>
              You have a pending post</Text>}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Image
                style={{ height: 50, width: 50, borderRadius: 5 }}
                source={{ uri: postDetailsPending.type === 'image' ? postDetailsPending.image : postDetailsPending.video }} />

            </View>

            <Text style={{ marginVertical: 10 }}>Enter your post caption</Text>
            <TextInput
              clearButtonMode={'while-editing'}
              height={80}
              maxLength={100}
              onChange={e => {
                console.log(e.nativeEvent.text)
                setPostDetailsPending(state => ({
                  ...postDetailsPending,
                  caption: e.nativeEvent.text
                }))
              }}
            />
            <Btn title='Post Now' containerStyle={{ marginTop: 10 }}
              disabled={postDetailsPending.caption === ''}
              onPress={() => handlePostTask(postDetailsPending)} />

          </View>
          <Divider style={{ marginVertical: 20 }} />
        </View>}
    </View>
  )
}

export default PendingPost
