import React from 'react'
import { ScrollView, View, Text, ActivityIndicator } from 'react-native'
import Button from 'react-native-button'
import { List, Divider } from 'react-native-paper';
import FastImage from 'react-native-fast-image'
import * as timeago from 'timeago.js';

import PostService from '../../../utils/post/PostService'
import NotifService from '../../../utils/notifs/NotifService'
import { useStore } from '../../../utils/store'


const Notifs = ({ navigation }) => {
  const notifService = NotifService()
  const [loading, setLoading] = React.useState(false)
  const [storeState, storeDispatch] = useStore()
  const { user } = storeState
  const [myNotifs, setMyNotifs] = React.useState([])
  const [myPosts, setMyPosts] = React.useState([])

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button style={{ marginLeft: 20 }} onPress={() => {
          navigation.goBack()
        }}>
          Back
        </Button>
      ),
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Button onPress={handleShowNotifs}>
            {loading ? <ActivityIndicator /> : 'Done'}
          </Button>
        </View>
      ),
    })
    handleShowNotifs()
    return () => { }
  }, [user])


  const handleShowNotifs = async () => {
    PostService.getUserPosts(user.uid,
      posts => setMyPosts(posts))

    const data = await notifService.readLikedPosts()
    setMyNotifs(data)
  }

  return (
    <ScrollView>
      {/* <Text>{JSON.stringify(myPosts, null, 2)}</Text> */}

      {myNotifs.map((itm, idx) => (
        <View key={idx}>

          <List.Item

            title={`${itm.name} liked your post`}
            description={timeago.format(itm.createdAt)}
            left={props => <FastImage
              style={{ height: 50, width: 50, margin: 10, borderRadius: 5 }}
              source={{
                uri: itm.image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />}
            right={props => <FastImage
              style={{ height: 50, width: 50, margin: 10, borderRadius: 50 / 2 }}
              source={{
                uri: itm.avatar,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />}
          />
          <Divider />
        </View>
      ))
      }
    </ScrollView >
  )
}

export default Notifs
