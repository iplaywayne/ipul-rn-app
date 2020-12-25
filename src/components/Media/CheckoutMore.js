import React from 'react';

export default function CheckoutMore() {

  return <View><Text>Checkout More TODO . .</Text></View>

  return (
    <View>
      <View>
        <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
          {user?.name}, checkout more songs like this
        </Text>
      </View>
      <View>
        {tracksLikeThis && tracksLikeThis.map((itm, idx) => (
          <TouchableOpacity key={itm.acid * Math.round(1700)}
            onPress={() => handleSelectedTapped(itm)}
            style={{
              flexDirection: 'row', paddingLeft: 20, paddingBottom: 10,
              alignItems: 'center'
            }}>
            <FastImage source={itm?.art_link ? { uri: itm.art_link } : logo}
              style={{
                height: 50, width: 50, borderRadius: 50 / 2
              }} />
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ padding: 0 }}>
                <Text style={{ fontWeight: '700' }}>{itm.artist}</Text> {itm.title} {itm.acid === currentTrack.acid &&
                  <Text style={{ color: 'purple', fontWeight: '700' }}>is Playing</Text>}
              </Text>
              <Text style={{ opacity: .5 }}>{itm.genre}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}