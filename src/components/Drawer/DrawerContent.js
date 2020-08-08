import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DrawerItem, SafeAreaView } from '@react-navigation/drawer';

import { useAuth } from '../../contexts/AuthContext'


const DrawerContent = (props) => {
  // const auth = useAuth()

  return (
    <View>
      <View style={styles.root} >

        <Text style={{ color: 'white', fontSize: 15 }}>
          Header
      </Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f50057',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default DrawerContent
