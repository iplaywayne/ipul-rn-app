// import React from 'react'
// import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
// import {
//   Block, Button, Card, Icon, Input, NavBar, Text as GalText,
//   DeckSwiper
// } from 'galio-framework';

// import { useAuth } from '../../contexts/AuthContext'

// const elements = [
//   <View style={{ backgroundColor: '#B23AFC', height: 250, width: 250 }}>
//     <Text>You wanna see a cool component?</Text>
//     <Text>Galio has this cool Deck Swiper</Text>
//   </View>,
//   <View style={{ backgroundColor: '#FE2472', height: 250, width: 250 }}>
//     <Text>What did you expect?</Text>
//     <Text>This React Native component works perfectly</Text>
//   </View>,
//   <View style={{ backgroundColor: '#FF9C09', height: 250, width: 250 }}>
//     <Text>Maybe you want to build the next Tinder</Text>
//   </View>,
//   <View style={{ backgroundColor: '#45DF31', height: 250, width: 250 }}>
//     <Text>or maybe you just want a nice deck swiper component</Text>
//     <Text>Galio has everything sorted out for you</Text>
//   </View>
// ]

// const Swiper = () => (
//   <View style={{ flex: 1 }}>
//     <Block>
//       <DeckSwiper components={elements} />
//     </Block>
//   </View>
// )

// function ExploreSwiper() {
//   const [authState, authDispatch] = useAuth()
//   const { user } = authState
//   // const { name, avatar, details } = user ?? 'N/A'
//   // const details = user && 'details' in user ?? 'N/A'
//   // const firstName = details && 'details' in user

//   return (
//     <ScrollView horizontal={true}>
//       <View style={styles.root}>
//         <Card
//           flex
//           borderless
//           shadow={true}
//           style={{ padding: 5 }}
//           // title={name ? name : 'null'}
//           caption="139 minutes ago"
//           // location={firstName ? firstName : 'null'}
//           avatar={avatar}
//           imageStyle={{ borderRadius: 10 }}
//           imageBlockStyle={{ padding: 2 }}
//           image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
//         />
//       </View>
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   root: {
//     padding: 10,
//     flex: 1,
//     width: 320,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 20
//   },
//   miniCard: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     height: 200,
//     width: 200,
//     marginTop: 10,
//     marginLeft: 20,
//     borderRadius: 5
//   },
//   miniCardImage: {
//     flex: 3,
//     overflow: 'hidden',
//   },
//   miniCardText: {
//     flex: 1
//   }
// })

// export default ExploreSwiper
