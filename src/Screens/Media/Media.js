import React from 'react'
import {
  View, Button, SafeAreaView, ScrollView, StyleSheet, Image, ActivityIndicator,
  Dimensions, VirtualizedList, FlatList, TouchableOpacity, StatusBar
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
// import BottomSheet from 'reanimated-bottom-sheet'
import { List, Divider } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import { firebase, database, MediaService } from '../../utils'
import { Center, MiniCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import { logo, width, height } from '../../constants'
import BottomSheet from 'react-native-simple-bottom-sheet';
import { Modalize } from 'react-native-modalize';

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
  const { tracks, currentTrack, queued } = storeState
  const refRBSheet = React.useRef();
  const modalizeRef = React.useRef(null);

  if (!tracks) return <ActivityIndicator
    style={{ flex: 1, backgroundColor: '#121212' }} color='pink'
  />

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const MediaContent = () => (
    <View style={styles.sheetContent}>
      {/* <View style={styles.handlerBar}></View> */}

      <View style={{ alignItems: 'center', marginBottom: 5 }}>
        <Image source={currentTrack ? { uri: currentTrack.art_link } : logo}
          style={{ flex: 0, height: 200, width: 200, marginTop: 25, marginBottom: 20, borderRadius: 5 }}
          resizeMode='cover' />
        {currentTrack && <Text style={{ fontWeight: '700' }}>{currentTrack.title}</Text>}
      </View>

      <ScrollView style={{ height: 'auto', marginBottom: 70 }}
        showsVerticalScrollIndicator={false}>
        <Divider style={{ marginBottom: 15 }} />
        {tracks && tracks.slice(0, 7).map((itm, idx) => (
          <TouchableOpacity key={idx} onPress={e => console.log(itm.title)}>
            <View
              style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
              <Image source={itm.art_link ? { uri: itm.art_link } : logo}
                style={{ height: 50, width: 50, marginRight: 15, borderRadius: 5 }}
                resizeMode='cover' />
              <Text style={{ marginVertical: 10, marginRight: 5, fontWeight: '700' }}>{itm.artist}</Text>
              <Text style={{ marginVertical: 10 }}>{itm.title}</Text>
            </View>
            <Divider />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  return (
    <View style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image source={logo}
          style={styles.logo} resizeMode='cover' />
        <Text style={{
          zIndex: 1, top: 100, fontWeight: '700', color: 'white',
          position: 'absolute', left: 30
        }} h4>Media</Text>

        <MediaContent />
        {/* <ScrollView>
          {tracks && tracks.map((itm) => (
            <TouchableOpacity onPress={()=>onOpen()}>
              <Text style={{ color: '#fff', padding: 20 }}>{itm.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}
      </View>

      {/* <Modalize
        ref={modalizeRef}
        modalHeight={500}
        alwaysOpen={true}
      >
        <MediaContent />
      </Modalize> */}
    </View>
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
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: -100,
    height: 700,
  },
  handlerBar: {
    position: 'absolute',
    backgroundColor: '#D1D1D6',
    top: 10,
    borderRadius: 3,
    height: 5,
    width: 30,
    flex: 1,
  },
})


export default Explore
