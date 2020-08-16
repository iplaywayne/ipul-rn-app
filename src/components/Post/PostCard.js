import React from 'react'
import { View, Text, ScrollView, Image as Img, StyleSheet, TouchableOpacity } from 'react-native'
import {
  Block, Button, Card, Icon, Input, NavBar, Text as GalText,
  DeckSwiper
} from 'galio-framework';
import { Divider } from 'react-native-paper'
import { FastImage as Image } from 'react-native-fast-image'
import * as timeago from 'timeago.js';
import Video from 'react-native-video'

import { useAuth, useStore, trimWWWString } from '../../utils'
import { siteLogo } from '../../constants'
import FireStore from '../../utils/firebase/FireStore'


function PostCard(props) {
  const { item, navigation } = props
  const [authState, authDispatch] = useAuth()
  const { user } = authState
  const [storeState] = useStore()
  const [postAuthor, setPostAuthor] = React.useState(null)

  React.useEffect(() => {
    FireStore.readUserById(item.uid,
      user => setPostAuthor(user))
  }, [])

  return (
    <ScrollView style={styles.root}>
      <TouchableOpacity>


        <View>


          {item.image ?
            <Card
              flex
              borderless
              shadow
              title={item && item.caption}
              caption={timeago.format(item.createdAt)}
              style={{ padding: 0 }}
              location={(postAuthor || {}).name}
              avatar={(postAuthor || {}).avatar || siteLogo}
              children={<Img
                source={{ uri: item.image }}
                style={{ height: 500, width: '100%', maxWidth: 600 }}
                paused={true}
              />}

            /> : null}

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

      </TouchableOpacity>
    </ScrollView>
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
