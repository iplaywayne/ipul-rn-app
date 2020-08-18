import React from 'react'
import {
  View, Text, ScrollView, Image as Img, StyleSheet, TouchableOpacity,
  TouchableHighlight, ActionSheetIOS
} from 'react-native'
import {
  Block, Button, Card, Icon, Input, NavBar, Text as GalText,
  DeckSwiper
} from 'galio-framework';
import { Divider } from 'react-native-paper'
import { FastImage as Image } from 'react-native-fast-image'
import * as timeago from 'timeago.js';
import Video from 'react-native-video'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useAuth, useStore, trimWWWString } from '../../utils'
import { siteLogo } from '../../constants'
import FireStore from '../../utils/firebase/FireStore'
import PostService from '../../utils/post/PostService'


function PostCard(props) {
  const { item, navigation, isAuthor } = props
  const [storeState] = useStore()
  const { user } = storeState
  const [postAuthor, setPostAuthor] = React.useState(null)


  React.useEffect(() => {
    FireStore.readUserById(item.uid,
      user => setPostAuthor(user))
  }, [])

  const handlePostLike = () => {
    console.log('TODO like post', item.key)
  }

  const handlePostMenu = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Remove Post"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          try {
            PostService.removePost(user.uid, item.key)
          } catch (e) {
            console.log('Post was not removed, try again', e)
          }
        }
      }
    );


  return (
    <ScrollView style={styles.root}>


      <View>

        {item.image ?
          <Card
            flex
            borderless
            shadow
            // title={item && item.caption}
            title={(postAuthor || {}).name}
            caption={(postAuthor || {}).occupation}
            style={{ padding: 0 }}
            location={timeago.format(item.createdAt)}
            avatar={(postAuthor || {}).avatar}
            children={<TouchableHighlight onPress={() => { }}>
              <Img
                source={{ uri: item.image }}
                style={{ height: 500, width: '100%', maxWidth: 600 }}
                paused={true}
              />
            </TouchableHighlight>}

          /> : null}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            {/* <Text style={{ marginRight: 20 }}><MaterialCommunityIcons name='share' size={25} /></Text> */}
            <TouchableOpacity onPress={handlePostLike} style={{ marginLeft: 10 }}>
              <Text><MaterialCommunityIcons name='heart-outline' size={25} /></Text>
            </TouchableOpacity>
          </View>
          {isAuthor &&
            <TouchableOpacity onPress={handlePostMenu}>
              <Text><MaterialCommunityIcons name='dots-horizontal' size={25} /></Text>
            </TouchableOpacity>}
        </View>

        <View style={{
          marginHorizontal: 15, marginBottom: 15, flexDirection: 'row',
          justifyContent: 'flex-start'
        }}>
          <Text style={{ marginRight: 5, fontWeight: '700' }}>{user.name}</Text>
          <Text>{item.caption}</Text>
        </View>

        <Divider />

        {item.video ?
          <Card
            flex
            borderless
            shadow
            title={item && item.caption}
            caption={timeago.format(item.createdAt)}
            location={(postAuthor || {}).name}
            avatar={(postAuthor || {}).avatar || siteLogo}
            imageStyle={{ borderRadius: 10, height: 400 }}
            children={<Video
              source={{ uri: item.video }}
              style={{ height: 500, width: '100%', maxWidth: 600 }}
              paused={true}
            />}
          >
          </Card> : null}

        <Divider />
      </View>

    </ScrollView >
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
    marginTop: 10,
    width: '100%',
    maxWidth: 500,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 200,
    width: 200,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 5,
    paddingBottom: 50,

  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
  },
  miniCardText: {
    flex: 1
  }
})

export default PostCard
