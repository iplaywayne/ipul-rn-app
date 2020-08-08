import React from 'react'
import {
  View, Text, Button, SafeAreaView, ScrollView, StyleSheet, Image,
  Dimensions, VirtualizedList,FlatList
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'

import { Center } from '../../components/Center'
import { useAuth } from '../../contexts/AuthContext'
import MiniCard from '../../components/Media/MiniCard'

const { width, height } = Dimensions.get('window')
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
  
  return (
    <ScrollView style={styles.root}>
      <View>
        <Text style={styles.title}>Playground</Text>
      </View>

      <MiniCard />

      <View style={styles.footer}>
        <Text style={{ color: 'white' }}>Your favorites are coming</Text>
        {/* <VirtualizedList
          data={DATA}
          initialNumToRender={4}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.key}
          getItemCount={getItemCount}
          getItem={getItem}
        /> */}
      </View>

      <View>
        {/* <Text>{JSON.stringify(user, null, 2)}{name}</Text> */}
        {/* <Button title='Sign Out' onPress={() => authDispatch.signOut()} /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 30,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: '#121212',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    height: height,
    marginTop: 40
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
  }
})


export default Explore
