import React from 'react'
import {
  View, Button, SafeAreaView, ScrollView, StyleSheet, Image, ActivityIndicator,
  Dimensions, VirtualizedList, FlatList, TouchableOpacity, StatusBar
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
import BottomSheet from 'reanimated-bottom-sheet'

import { firebase, database, MediaService } from '../../utils'
import { Center, MiniCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import { logo, width, height } from '../../constants'



const DATA = [];
const getItem = (data, index) => {
  return {
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`
  }
}
const getItemCount = (data) => {
  return 50;
}
const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={{ color: 'white', marginVertical: 5 }}>{title}</Text>
    </View>
  );
}


function Explore() {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { tracks } = storeState

  if (!tracks) return <ActivityIndicator
    style={{ flex: 1, backgroundColor: '#121212' }} color='pink'
  />

  const sheetHeader = () => (
    <View style={styles.sheetHeader}><Text>Header</Text></View>
  )

  const sheetContent = () => (
    <View style={styles.sheetContent}>
      <View style={styles.handlerBar}>
        {/* <Text style={{ color: '#fff' }}>Idle . .</Text> */}
      </View>
    </View>
  )

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={logo}
          style={styles.logo} resizeMode='cover' />
        <Text style={{
          zIndex: 1, top: 100, fontWeight: '700', color: 'white',
          position: 'absolute', left: 30
        }} h4>Media</Text>

        {/* <MiniCard /> */}

        {/* <View style={styles.footer}>
          <Text style={{ color: 'white', marginBottom: 10 }} h5>Playground</Text> */}
        {/* <Button title='Sign Out' onPress={() => authDispatch.signOut()} /> */}

        {/* <ScrollView style={{ height: 'auto', paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}>
            {tracks && tracks.map((itm, idx) => (
              <TouchableOpacity key={idx} onPress={e => console.log(itm.title)}>
                <View
                  style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
                  <Image source={itm.art_link ? { uri: itm.art_link } : logo}
                    style={{ height: 50, width: 50, marginRight: 15, borderRadius: 5 }}
                    resizeMode='cover' />
                  <Text style={{ color: 'white', marginVertical: 10, marginRight: 5, fontWeight: '700' }}>{itm.artist}</Text>
                  <Text style={{ color: 'white', marginVertical: 10 }}>{itm.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView> */}
        {/* </View> */}
      </View>



      <BottomSheet
        borderRadius={25}
        initialSnap={2}
        snapPoints={[800, 220, -380]}
        // renderHeader={sheetHeader}
        renderContent={sheetContent}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    // paddingVertical: 30,
    backgroundColor: '#121212',
    flex: 1,
  },
  logo: {
    borderRadius: 30,
    height: height * .3,
    width: width,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 20,
  },
  header: {
    flex: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 120,
    paddingHorizontal: 30,
    height: height - 200,
    marginTop: -40
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 200,
    width: 200,
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
  },
  sheetHeader: {
    backgroundColor: '#fff',
    height: 100,
  },
  sheetContent: {
    marginTop: 100,
    backgroundColor: '#fff',
    height: 600,
    borderRadius: 25,
    // borderTopLeftRadius: 25,
    alignItems: 'center',
    paddingTop: 10
  },
  handlerBar: {
    position: 'absolute',
    backgroundColor: '#D1D1D6',
    top: 10,
    borderRadius: 3,
    height: 5,
    width: 30,
  },
})


export default Explore
