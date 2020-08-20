import React from 'react'
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import Button from 'react-native-button'
import { List, Divider } from 'react-native-paper';
import FastImage from 'react-native-fast-image'
import * as timeago from 'timeago.js';
import Video from 'react-native-video'

import PostService from '../../../utils/post/PostService'
import NotifService from '../../../utils/notifs/NotifService'
import { useStore } from '../../../utils/store'


const Notifs = ({ route, navigation }) => {
  const notifService = NotifService()
  const [loading, setLoading] = React.useState(false)
  const [storeState, storeDispatch] = useStore()
  const { user } = storeState
  const [myNotifs, setMyNotifs] = React.useState([])
  const [myPosts, setMyPosts] = React.useState([])

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Button onPress={() => navigation.navigate('Profile')}>
            {loading ? <ActivityIndicator /> : 'Done'}
          </Button>
        </View>
      ),
    })
    handleShowNotifs()
    return () => { }
  }, [route, navigation])


  const handleShowNotifs = async () => {
    const myPosts = await PostService.getUserPostsSync(user.uid)
    setMyPosts(myPosts)

    const likedPosts = await notifService.readLikedPosts(user.uid)
    setMyNotifs(likedPosts)
  }

  return (
    <ScrollView>

      {myNotifs.map((itm, idx) => (
        <TouchableOpacity key={idx} onPress={() => navigation.navigate('PostView', {
          postId: itm.key
        })}>
          <List.Item
            title={`${itm.name} liked your post`}
            description={timeago.format(itm.createdAt)}
            left={props => {
              return (itm.image ? <FastImage
                style={{ height: 50, width: 50, margin: 10, borderRadius: 5 }}
                source={{
                  uri: itm.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              /> : <Video
                  source={{ uri: itm.video }}
                  style={{ width: 50, height: 50, margin: 10, borderRadius: 5 }}
                  resizeMode='cover'
                  paused={true}
                />)
            }}
            right={props => <FastImage
              style={{ height: 50, width: 50, margin: 10, borderRadius: 50 / 2 }}
              source={{
                uri: itm.avatar,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />}
          />

          {/* <Text>{JSON.stringify(itm, null, 2)}</Text> */}
          <Divider />
        </TouchableOpacity>
      ))
      }
    </ScrollView >
  )
}

export default Notifs
