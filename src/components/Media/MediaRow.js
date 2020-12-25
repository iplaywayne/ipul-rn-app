import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { MiniCard } from '../'


const MediaRow = ({ title, query, tracks }) => (
  <View>
    <Text style={{ paddingTop: 5, paddingLeft: 15, paddingBottom: 10, fontWeight: '700' }}>{title}</Text>

    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 15, flexDirection: 'row' }}>

      {tracks && tracks.filter(t => JSON.stringify(t).toLowerCase().includes(query)).map((itm, idx) => (
        <MiniCard key={itm.acid} item={itm} />
      ))}

    </ScrollView>

  </View>
)

export default MediaRow