import React from 'react'
import {
  View, Button as Btn, SafeAreaView, ScrollView, StyleSheet, Image,
  Dimensions, TouchableOpacity, StatusBar, Animated, ActivityIndicator
} from 'react-native'
import { logo, width, height } from '../../constants'


export const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#121212',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    height: height
  },
  title: {
    fontSize: 15,
    padding: 20,
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
  handlerBar: {
    position: 'absolute',
    backgroundColor: '#D1D1D6',
    top: 20,
    borderRadius: 3,
    height: 5,
    width: 30,
    flex: 1,
  },
})
