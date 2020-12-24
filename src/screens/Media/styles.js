import React from 'react'
import { StyleSheet } from 'react-native'

import { siteLogo, logo, width, height } from '../../constants'


export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  logo: {
    borderRadius: 30,
    height: height * .4,
    width: width,
  },
  title:
  {
    zIndex: 1, top: 100, fontWeight: '700', color: 'white',
    position: 'absolute', left: 30
  },
  header: {
    flex: 1,
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
    backgroundColor: '#121212',
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
