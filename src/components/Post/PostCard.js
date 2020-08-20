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
import DoubleClick from 'react-native-double-tap'
import InView from 'react-native-component-inview'


import { useAuth, useStore, trimWWWString } from '../../utils'
import { siteLogo } from '../../constants'
import FireService from '../../utils/firebase/FireService'
import PostService from '../../utils/post/PostService'


function PostCard(props) {
  const { item, navigation, isAuthor } = props
  const [storeState] = useStore()
  const { user } = storeState
  const [postAuthor, setPostAuthor] = React.useState(null)
  const [isLiked, setIsLiked] = React.useState(false)
  const [isPostPaused, setIsPostPaused] = React.useState(true)
  const videoRef = React.useRef()
  const [postPlays, setPostPlays] = React.useState(0)
  const [didTapPlay, setDidTapPlay] = React.useState(false)

  const [isInView, setIsInView] = React.useState(false)
  const checkVisible = (isVisible, item) => {
    if (isVisible) {
      if (item.video && isPostPaused && didTapPlay && postPlays < 3) {
        postPlay()
        console.log(item.caption, 'VIDEO IN VIEW', postPlays)
      }
    } else {
      if (!isPostPaused) setIsPostPaused(true)
    }
  }

  React.useEffect(() => {
    FireService.readUserById(item.uid,
      user => setPostAuthor(user))
  }, [])

  React.useEffect(() => {
    if (user.uid && item.key) {
      readIsPostLiked()
    }
  }, [])

  const readIsPostLiked = async () => {
    const liked = await PostService.isPostLiked(user.uid, item.key)
    setIsLiked(liked === true ? true : false)
  }

  const resetPlay = () => {
    videoRef.current.seek(0)
    setIsPostPaused(true)
  }

  const postPlay = () => {
    setPostPlays(postPlays + 1)
    videoRef.current.seek(0)
    setIsPostPaused(false)
  }

  const postPause = () => {
    setIsPostPaused(true)
  }

  const handlePostPlay = () => {
    if (!isPostPaused) {
      setDidTapPlay(false)
      postPause()
    } else {
      setDidTapPlay(true)
      postPlay()
    }
  }

  const handlePostLike = async () => {
    let postDetails = {
      uid: user.uid, key: item.key, avatar: user.avatar, name: user.name,
      image: item.image && item.image, video: item.video && item.video,
      caption: item.caption
    }
    let newLike = !isLiked ? true : false
    await PostService.addPostLike(postDetails, !isLiked)
    setIsLiked(!isLiked)
  }

  const handleNavigateProfile = () => {
    navigation.navigate('PublicProfile', {
      authorId: postAuthor.uid
    })
  }

  const handleNavigatePost = () => {
    navigation.navigate('PostView', {
      postId: item.key
    })
  }

  const handlePostMenu = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "View Author", "View Post", "Remove Post"],
        destructiveButtonIndex: 3,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            console.log('Cancel')
            return
          case 1:
            console.log('View Author')
            handleNavigateProfile()
            return
          case 2:
            console.log('View Post')
            handleNavigatePost()
            return
          case 3:
            try {
              PostService.removePost(user.uid, item.key)
            } catch (e) {
              console.log('Post was not removed, try again', e)
            }
            return
          default:
            return
        }
      }
    );


  return (
    <ScrollView style={styles.root}>

      <InView onChange={(isVisible) => checkVisible(isVisible, item)}>
        {item.image ?
          <Card
            flex
            borderless
            shadow
            title={(postAuthor || {}).name}
            caption={(postAuthor || {}).occupation}
            location={timeago.format(item.createdAt)}
            avatar={(postAuthor || {}).avatar}
            children={<DoubleClick
              doubleTap={handlePostLike}
              delay={200}
            ><Img
                source={{ uri: item.image }}
                style={{ height: 500, width: '100%', maxWidth: 600 }}
              />
            </DoubleClick>}

          /> : null}

        {item.video ?
          <Card
            flex
            borderless
            shadow
            title={(postAuthor || {}).name}
            caption={(postAuthor || {}).occupation}
            location={timeago.format(item.createdAt)}
            avatar={(postAuthor || {}).avatar}
            imageStyle={{ borderRadius: 10, height: 400 }}
            children={<DoubleClick
              singleTap={handlePostPlay}
              doubleTap={handlePostLike}
              delay={200}
            ><Video
                ref={ref => videoRef.current = ref}
                source={{ uri: item.video }}
                style={{ height: 500, width: '100%', maxWidth: 600 }}
                paused={isPostPaused}
                onEnd={() => setIsPostPaused(true)}
                resizeMode='cover'
              /></DoubleClick>}
          >
          </Card> : null}


        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 10,
          marginTop: 10
        }}>
          <View style={{ flexDirection: 'row' }}>
            {/* <Text style={{ marginRight: 20 }}><MaterialCommunityIcons name='share' size={25} /></Text> */}
            <TouchableOpacity onPress={handlePostLike} style={{ marginHorizontal: 3 }}>
              <Text style={{ color: isLiked === true ? 'red' : 'black' }}>
                <MaterialCommunityIcons
                  name={isLiked === true ? 'heart' : 'heart-outline'}
                  size={25} />
              </Text>
            </TouchableOpacity>
            {item.video &&
              <TouchableOpacity onPress={handlePostPlay} style={{ marginLeft: 5 }}>
                <Text style={{ color: 'black' }}>
                  <MaterialCommunityIcons
                    name={isPostPaused ? 'play' : 'pause'}
                    size={25} />
                </Text>
              </TouchableOpacity>}
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
          <Text style={{ marginRight: 5, fontWeight: '700' }}>{(postAuthor || {}).name}</Text>
          <Text>{item.caption}</Text>
        </View>
      </InView>

      <Divider />

      {/* <Text>{JSON.stringify(postAuthor, null, 2)}</Text> */}
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 0,
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
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default PostCard
