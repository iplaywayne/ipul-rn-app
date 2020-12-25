import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

const HomeHeader = ({ isAdmin, name }) => (
  <View>
    <Text style={styles.title}>
      {isAdmin ? 'Hi Admin' : 'Welcome'}{name && `, ${name}`}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    marginTop: 10,
  },
})


export default HomeHeader