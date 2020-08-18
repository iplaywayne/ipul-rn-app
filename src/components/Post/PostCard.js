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


function PostCard(props) {
  const { item, navigation, isAuthor } = props
  const [authState, authDispatch] = useAuth()
  const { user } = authState
  const [storeState] = useStore()
  const [postAuthor, setPostAuthor] = React.useState(null)

  React.useEffect(() => {
    FireStore.readUserById(item.uid,
      user => setPostAuthor(user))
  }, [])

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Edit Post", "Remove Post"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          console.log(Math.floor(Math.random() * 100) + 1);
        } else if (buttonIndex === 2) {
          console.log("🔮");
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
            title={item && item.caption}
            caption={timeago.format(item.createdAt)}
            style={{ padding: 0 }}
            location={(postAuthor || {}).name}
            avatar={(postAuthor || {}).avatar || siteLogo}
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
            <TouchableOpacity onPress={() => console.log('Liked Post!', item)}>
              <Text><MaterialCommunityIcons name='heart-outline' size={25} /></Text>
            </TouchableOpacity>
          </View>
          {isAuthor &&
            <TouchableOpacity onPress={onPress}>
              <Text><MaterialCommunityIcons name='dots-horizontal' size={25} /></Text>
            </TouchableOpacity>}
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
