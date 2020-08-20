import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'
import Spinner from 'react-native-spinkit'

import PostService from '../../utils/post/PostService'
import { useStore } from '../../utils/store'
import { width } from '../../constants'
import { Center } from '../../components'
import PostCard from '../../components/Post/PostCard'
import ErrorBoundary from '../../components/Alert/ErrorBoundary'


const Post = ({ route, navigation }) => {
  const { postId } = route.params
  const [{ user }] = useStore()
  const [post, setPost] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    getPost()
  }, [route])

  const getPost = async () => {
    const data = await PostService.getPostByID(user.uid, postId)
    setPost(data)
  }

  if (!post) return <Center><Spinner type='Wave' /></Center>

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ErrorBoundary caller='Post View'>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {post && <PostCard navigation={navigation} item={post}
            isAuthor={post.uid === user.uid} />}
        </View>
      </ErrorBoundary>
    </ScrollView>
  )
}

export default Post
