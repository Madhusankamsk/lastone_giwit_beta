import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { containerFull } from '../../CommonCss/PageCss'
import { formHead } from '../../CommonCss/FormCss'
import BottomNavBar from '../../Components/BottomNavBar'
import TopNavBar from '../../Components/TopNavBar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'

const NotificationPage = ({navigation}) => {
  return (
    <View style={styles.container} >
      <StatusBar/>
      <TopNavBar navigation={navigation}/>
      <BottomNavBar navigation={navigation} page = "NotificationPage"/>
      <View style={styles.c1} >
        <View style={styles.notification} >
          <Text>Some Notifications</Text>
        </View>
        <View style={styles.notification} >
          <Text>Some Notifications</Text>
        </View>
        <View style={styles.notification} >
          <Text>Some Notifications</Text>
        </View>
        <View style={styles.notification} >
          <Text>Some Notifications</Text>
        </View>
      </View>
    </View>
  )
}

export default NotificationPage

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'skyblue',
    paddingVertical: 70,
},
c1: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
},
notification: {
    width: '98%',
    height: 50,
    backgroundColor: '#111111',
    marginTop: 10,
}
})