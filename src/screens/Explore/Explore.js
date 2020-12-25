import React from 'react'
import { View, Text, Button, SafeAreaView, ScrollView, StyleSheet, Image, StatusBar } from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Divider } from 'react-native-paper'
import Spinner from 'react-native-spinkit'

import { ExploreCard, Center } from '../../components'
import { useAuth, useStore } from '../../contexts'
import MediaService from '../../utils/media/MediaService'

function Explore(props) {
  const { navigation } = props
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { tracks } = storeState
  const mediaService = MediaService()
  const topRemixes = tracks && tracks.filter(trk => JSON.stringify(trk).toString().toLowerCase().includes('remi'))
  const [loading, setLoading] = React.useState(true)


  React.useEffect(() => {
    setTimeout(() => {
      if (tracks.length) setLoading(false)
    }, 1500)
  }, [tracks])

  if (loading) return <Center><Spinner type='Wave' /></Center>

  return (
    <ScrollView style={styles.root}>

      <View>
        <Text style={styles.title}>Explore iPlayuListen</Text>
        {/* <Button title='Try' onPress={() => navigation.navigate('DEMO')}></Button> */}
      </View>

      <Divider/>

      <View style={{
        paddingTop: 10,
        paddingBottom: 50, justifyContent: 'center', alignItems: 'center'
      }}>
        {topRemixes.map((itm, idx) => (
          <ExploreCard {...props} key={itm.acid} item={itm} />
        ))}
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 10,
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 150,
    width: 150,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 5
  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
  },
  miniCardText: {
    flex: 1
  }
})


export default Explore
